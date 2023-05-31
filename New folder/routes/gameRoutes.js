const express = require('express');
const { body } = require('express-validator');
const gameController = require('../controllers/gameController');
const auth = require('../middlewares/auth');
const validateGameId = require('../middlewares/idChecker');

const router = express.Router();

// Create a new game
router.post(
  '/',
  auth,
  [
    body('gameId').notEmpty().withMessage('Game ID is required'),
    body('gameName').notEmpty().withMessage('Game name is required'),
    body('gameType').notEmpty().withMessage('Game type is required'),
    body('gameCover').notEmpty().withMessage('Game cover image URL is required'),
    body('featuredStarImg').notEmpty().withMessage('Featured star image URL is required'),
    body('featuredStarQuote').notEmpty().withMessage('Featured star quote is required'),
    // Add more validation rules as needed
  ],
  gameController.createGame
);

router.get('/:friendlyUrl', gameController.getGameByFriendlyUrl);

// Get all games
router.get('/', gameController.getAllGames);

// Get a game by ID
router.get('/:id', validateGameId, gameController.getGameById);

router.put(
  '/:id',
  auth,
  [
    body('gameId').notEmpty().withMessage('Game ID is required'),
    body('gameName').notEmpty().withMessage('Game name is required'),
    body('gameType').notEmpty().withMessage('Game type is required'),
    body('gameCover').notEmpty().withMessage('Game cover image URL is required'),
    body('featuredStarImg').notEmpty().withMessage('Featured star image URL is required'),
    body('featuredStarQuote').notEmpty().withMessage('Featured star quote is required'),
    // Add more validation rules as needed
  ],
  validateGameId,
  gameController.updateGame
);

// Delete a game
router.delete('/:id', auth, validateGameId, gameController.deleteGame);


module.exports = router;
