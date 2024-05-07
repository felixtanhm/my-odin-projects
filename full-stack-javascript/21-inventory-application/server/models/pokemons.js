const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PokeSchema = new Schema({
  name: { type: String, required: true },
  dexId: { type: Number, required: true },
  types: {
    type: [String],
    default: () => {
      return null;
    },
  },
  avatar: { type: String, required: true },
  details: { type: Schema.Types.ObjectId, ref: "PokeDetails", required: true },
  created_at: { type: Date, default: Date.now() },
  last_modified: { type: Date, default: Date.now() },
});

// Virtual for pokemon's URL
PokeSchema.virtual("url").get(function () {
  return `/pokemon/${this._id}`;
});

// Export model
module.exports = mongoose.model("Pokemon", PokeSchema);
