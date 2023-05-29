const Game = require("../models/Game");
const { validationResult } = require("express-validator");

// Display a dynamic game page based on friendlyURL
exports.getGameByFriendlyUrl = async (req, res) => {
  try {
    const friendlyUrl = req.params.friendlyUrl;
    const game = await Game.findOne({ friendlyUrl });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve game" });
  }
};

// Create a new game
exports.createGame = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Create and save the game
    const game = new Game(req.body);
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create game" });
  }
};

// Get all games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    return res.json(games);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to retrieve games" });
  }
};

// Get a game by ID
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve game" });
  }
};

// Update a game
// Update a game
exports.updateGame = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Find the game by ID
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Update the game fields from the request body
    game.gameId = req.body.gameId;
    game.gameName = req.body.gameName;
    game.gameType = req.body.gameType;
    game.gameCover = req.body.gameCover;
    game.featuredStarImg = req.body.featuredStarImg;
    game.featuredStarQuote = req.body.featuredStarQuote;

    // Update the filters field if present in the request body
    if (req.body.filters && Array.isArray(req.body.filters)) {
      game.filters = req.body.filters;
    }

    // Save the updated game document
    const updatedGame = await game.save();

    res.json(updatedGame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update game" });
  }
};

// Delete a game
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndRemove(req.params.id);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json({ msg: "Game deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete game" });
  }
};
