const mongoose = require('mongoose');

const validateGameId = async (req, res, next) => {
  try {
    const gameId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      return res.status(400).json({ error: 'Invalid game ID' });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to validate game ID' });
  }
};

module.exports = validateGameId;
