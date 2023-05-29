const Coach = require('../models/Coach');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler');
const Service = require('../models/Service');
const User = require('../models/User');
const Game = require('../models/Game');

// Get all coaches
exports.getAllCoaches = asyncHandler(async (req, res) => {
  const coaches = await Coach.find();
  res.json(coaches);
});

// Get a coach by ID
exports.getCoachById = asyncHandler(async (req, res) => {
  const coach = await Coach.findById(req.params.id);
  if (!coach) {
    return res.status(404).json({ msg: 'Coach not found' });
  }
  res.json(coach);
});

exports.createCoach = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, expertise, level, email, service, bio, coverPic, profilePicture, filters, socialMedia, faqs, username, gameName } = req.body;

  // Fetch the game to get the gameId
  const game = await Game.findOne({ gameName });
  if (!game) {
    return res.status(404).json({ msg: 'Game not found' });
  }
  const gameId = game._id;

  const coach = new Coach({
    name,
    expertise,
    service,
    bio,
    profilePicture,
    coverPic,
    filters,
    socialMedia,
    faqs,
    username,
    level,
    email,
    game: gameId,
    gameName,
    user: req.user.id,
  });

  // Find the user document and update the user type to Coach
  const user = await User.findById(req.user.id);
  if (user) {
    user.type = 'Coach';
    await user.save();
  } else {
    console.error(`User not found with id ${req.user.id}`);
    return res.status(404).json({ msg: 'User not found' });
  }
  if (user.type !== 'Coach') {
    console.error(`Failed to update user type for id ${req.user.id}`);
    return res.status(500).json({ msg: 'Failed to update user type' });
  }

  await coach.save();
  res.status(201).json(coach);
});

exports.getCoachAverageRating = asyncHandler(async (req, res) => {
  const { coachId } = req.params;
  const coach = await Coach.findById(coachId);
  if (!coach) {
    return res.status(404).json({ msg: 'Coach not found' });
  }
  res.json({ averageRating: coach.averageRating });
});

exports.getCoachIdByEmail = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const coach = await Coach.findOne({ email });
  if (!coach) {
    return res.status(404).json({ msg: 'Coach not found' });
  }
  res.json({ coachId: coach._id });
});

exports.getCoachLevel = asyncHandler(async (req, res) => {
  const coach = await Coach.findById(req.params.id);
  if (!coach) {
    return res.status(404).json({ msg: 'Coach not found' });
  }
  res.json({ level: coach.level });
});
// Get a coach by username
exports.getCoachByUsername = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const coach = await Coach.findOne({ username });

  if (!coach) {
    return res.status(404).json({ msg: 'Coach not found' });
  }

  res.json(coach);
});





exports.updateCoach = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const coach = await Coach.findById(req.params.id);
  if (!coach) {
    return res.status(404).json({ msg: 'Coach not found' });
  }

  const updateFields = req.body;
  for (let key in updateFields) {
    coach[key] = updateFields[key];
  }

  await coach.save();
  res.json(coach);
});
