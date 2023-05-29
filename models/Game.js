const mongoose = require('mongoose');
const Coach = require('./Coach');

const GameFilterSchema = new mongoose.Schema({
  filterName: {
    type: String,
    required: [true, 'Please provide a name for the filter'],
  },
  filterOptions: {
    type: [String], 
    required: [true, 'Please provide options for the filter'],
  },
  filterType: {
    type: String,
    enum: ['multiSelect', 'dropdown', 'rangeSlider', 'select'],
    required: [true, 'Please provide type for the filter'],
  },
});

const GameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: [true, 'Please provide a game id'],
    unique: true,
  },
  gameName: {
    type: String,
    required: [true, 'Please provide a name for the game'],
  },
  gameTitle: {
    type: String,
    required: [true, 'Please provide a title for the game'],
  },
  gameDescription: {
    type: String,
    required: [true, 'Please provide a description for the game'],
  },
  friendlyUrl: {
    type: String,
    required: [true, 'Please provide a friendly URL for the game'],
    unique: true,
  },
  gameType: {
    type: String,
    required: [true, 'Please provide a gameType'],
  },
  numberOfCoaches: {
    type: Number,
    default: 0,
  },
  filters: [GameFilterSchema],
  gameCover: {
    type: String,
    required: [true, 'Please provide a game cover image URL'],
  },
  gameBanner: {
    type: String,
    required: [true, 'Please provide a game banner image URL'],
  },
  featuredStarImg: {
    type: String,
    required: [true, 'Please provide a featured star image URL'],
  },
  featuredStarQuote: {
    type: String,
    required: [true, 'Please provide a featured star quote'],
  },
});

GameSchema.pre('save', async function (next) {
  try {
    const coachCount = await Coach.countDocuments({ game: this._id });
    this.numberOfCoaches = coachCount;
    return next();
  } catch (error) {
    return next(error);
  }
});



const Game = mongoose.model('Game', GameSchema);

module.exports = Game;