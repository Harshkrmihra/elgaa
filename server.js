require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('./models/User');
const crypto = require('crypto');
const auth = require('./middlewares/auth');
const asyncHandler = require('./middlewares/asyncHandler');
const http = require('http');
const socketIO = require('socket.io');
const { Server } = require('socket.io');
const app = express();
const port = process.env.PORT || 3002;


// Create the HTTP server
const server = http.createServer(app);

// Create the WebSocket server
const io = new Server(server);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build", "index.html"));
});

// Import messageController and set io
const messageController = require('./controllers/messageController');
messageController.setIo(io); // This is the new line

function connectDB() {
  console.log('Connecting to MongoDB...');
  console.log('MongoDB URI:', process.env.MONGO_URI);

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');

      server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err.message);
      process.exit(1);
    });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
}

// Handle socket.io events
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ orderId }) => {
    socket.join(orderId);
  });

  // Handle new message event
  socket.on('sendMessage', messageController.sendMessage);

  // Handle errors
  socket.on('connect_failed', function() {
    console.error("Sorry, there seems to be an issue with the connection!");
  });

  socket.on('error', function(err) {
    console.error("Socket.IO Error:", err);
  });

  socket.on('reconnect_failed', function() {
    console.error("Reconnection to the server failed!");
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// passport.use(
//   new DiscordStrategy(
//     {
//       clientID: process.env.DISCORD_CLIENT_ID,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET,
//       callbackURL: process.env.DISCORD_CALLBACK_URL,
//       scope: ['identify', 'email'],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       User.findOne({ discordId: profile.id })
//         .then((existingUser) => {
//           if (existingUser) {
//             return done(null, existingUser);
//           } else {
//             const tempPassword = crypto.randomBytes(15).toString('hex');
//             const newUser = new User({
//               discordId: profile.id,
//               username: profile.username,
//               email: profile.email,
//               password: tempPassword,
//             });

//             newUser
//               .save()
//               .then((user) => {
//                 // Send tempPassword to user via email.
//                 return done(null, user);
//               })
//               .catch((err) => {
//                 return done(
//                   new Error('Failed to save new user: ' + err.message)
//                 );
//               });
//           }
//         })
//         .catch((err) => {
//           return done(new Error('User lookup failed: ' + err.message));
//         });
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     if (err) {
//       done(new Error('Failed to deserialize a user: ' + err.message));
//     } else {
//       done(null, user);
//     }
//   });
// });

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  console.log('Authorization Header:', req.header('Authorization'));
  next();
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const coachRoutes = require('./routes/coachRoutes');
app.use('/api/coaches', coachRoutes);


app.use((req, res, next) => {
  console.log('Incoming request URL:', req.url);

  if (req.url.startsWith('/@')) {
    console.log('Routing to coachRoutes');
    coachRoutes(req, res, next);
  } else if (req.url === '/' || req.url.match(/^\/[a-zA-Z0-9-_]+$/)) {
    console.log('Routing to gameRoutes');
    gameRoutes(req, res, next);
  } else {
    console.log('Skipping middleware, continuing to next');
    next();
  }
});





// Add the following line for review routes
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

const serviceController = require('./controllers/serviceController');
app.use('/api/services/all', serviceController.getAllServices);

const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/coaches/:coachId/services', serviceRoutes);


const gameRoutes = require('./routes/gameRoutes');
app.use('/', gameRoutes);
app.use('/api/games', gameRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

const affiliateController = require('./controllers/affiliateController'); // Import the affiliate controller

const affiliateRoutes = require('./routes/affiliateRoutes');
app.use('/api/affiliate', affiliateRoutes);

// Generate affiliate link
app.post(
  '/api/affiliate/generate-link',
  auth,
  asyncHandler(affiliateController.generateAffiliateLink)
);

app.get('/auth/discord', passport.authenticate('discord'));

app.get(
  '/auth/discord/redirect',
  passport.authenticate('discord', {
    failureRedirect: '/login',
  }),
  function (req, res) {
    res.redirect('/'); // Or wherever you want the user to go
  }
);
app.get('/', (req, res) => {
  res.send('Hello, EGA!');
});

connectDB();
