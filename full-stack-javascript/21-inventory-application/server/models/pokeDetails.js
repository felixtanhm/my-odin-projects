const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PokeDetailsSchema = new Schema({
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  has_gender: { type: Boolean, required: true },
  hp: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  special_attack: { type: Number, required: true },
  special_defense: { type: Number, required: true },
  speed: { type: Number, required: true },
  abilities: {
    type: [String],
    default: () => {
      return null;
    },
  },
  created_at: { type: Date, default: Date.now() },
  last_modified: { type: Date, default: Date.now() },
});

// Export model
module.exports = mongoose.model("PokeDetails", PokeDetailsSchema);
