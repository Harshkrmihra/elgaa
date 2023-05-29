const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication middleware
module.exports = async function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Decoded token:', decoded);

    if (!decoded.user || !decoded.user.id) {
      console.log('Invalid user information in token');
      return res.status(401).json({ msg: 'Invalid user information in token' });
    }

    // Retrieve the user from the database
    const user = await User.findById(decoded.user.id);

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user = user; // Assign the user object to the request

    console.log('User object:', req.user);
    console.log('Username:', req.user.username);
    console.log('User Type:', req.user.type);

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// isAdmin middleware
module.exports.isAdmin = function(req, res, next) {
    if (req.user.type !== 'Admin') {
        console.log('User is not authorized');
        return res.status(403).json({ msg: 'User is not authorized' });
    }
    next();
}
