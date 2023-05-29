const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateAffiliateCode = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
};

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password, type } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Generate affiliate code
    const affiliateCode = generateAffiliateCode();

    // If the type of the new user is 'Admin' or 'Coach', check if the authenticated user is an admin
    if (type === 'Admin' || type === 'Coach') {
      if (!req.user) {
        return res.status(401).json({ msg: 'Authorization required to create an Admin or Coach user' });
      }

      // Get the authenticated user
      const authenticatedUser = await User.findById(req.user.id);

      // If the authenticated user is not an admin, return an error
      if (authenticatedUser.type !== 'Admin') {
        return res.status(403).json({ msg: 'Only admins can create new admin or coach accounts' });
      }
    } else if (type !== 'Customer') {
      return res.status(400).json({ msg: 'Invalid user type. User type can be Admin, Coach or Customer' });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password,
      type,
      affiliateCode
    });

    // Save the user to the database
    await user.save();

    // Create and return a JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a user's profile
exports.updateUserProfile = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.id !== req.user.id && user.type !== 'Admin') {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  // Implementation here
};
