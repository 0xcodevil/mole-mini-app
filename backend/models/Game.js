const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const GameSchema = new mongoose.Schema(
  {
		id: { type: String, unique: true, default: uuidv4 },
    userId: { type: String, required: true },
    score: { type: Number, default: 0 },
    finished: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;