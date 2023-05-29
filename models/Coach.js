const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for the coach'],
  },
  country: {
    type: String,
    required: false,
  },
  expertise: {
    type: String,
    required: [true, 'Please provide the coach\'s area of expertise'],
  },
  bio: {
    type: String,
    required: [true, 'Please provide a bio for the coach'],
  },
  game: {
    type: String,
    required: [true, 'Please provide a Game for the coach'],
  },
  gameName: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: [true, 'Please provide the URL of the coach\'s profile picture'],
  },
  coverPic: {
    type: String,
    required: [true, 'Please provide the URL of the coach\'s cover picture'],
  },
  filters: {
    type: [String],
    required: [true, 'Please provide the coach\'s filters'],
  },
  socialMedia: {
    type: {
      twitter: String,
      instagram: String,
      facebook: String,
      discord: String,
    },
  },
  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
  username: {
    type: String,
    required: [true, 'Please provide a username for the coach\'s URL'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide the coach\'s email'],
    unique: true,
  },
  averageRating: {
    type: Number,
    default: 5,
  },
  level: {
    type: String,
    required: [true, 'Please provide the coach level'],
  },
  gameId: {
    type: String,
    required: false,
  },

  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  }],
  startingPrice: {
    type: Number,
    default: 0,
  },
});

// Pre-save middleware to calculate the startingPrice based on the lowest service price
CoachSchema.pre('save', async function (next) {
  try {
    if (this.services.length > 0) {
      const lowestPrice = await this.model('Service')
        .find({ _id: { $in: this.services } })
        .sort({ price: 1 })
        .limit(1)
        .select('price');

      this.startingPrice = lowestPrice.length > 0 ? lowestPrice[0].price : 0;
    } else {
      this.startingPrice = 0;
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

const Coach = mongoose.model('Coach', CoachSchema);

module.exports = Coach;
