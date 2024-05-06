const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PokeSchema = new Schema({
  name: { type: String, required: true },
  dexId: { type: Number, required: true },
  types: { type: [String], default: undefined },
  avatar: { type: String, required: true },
  details: { type: Schema.Types.ObjectId, ref: "PokeDetails", required: true },
});

// Virtual for pokemon's URL
PokeSchema.virtual("url").get(function () {
  return `/pokemon/${this._id}`;
});

// Export model
module.exports = mongoose.model("Pokemon", PokeSchema);
