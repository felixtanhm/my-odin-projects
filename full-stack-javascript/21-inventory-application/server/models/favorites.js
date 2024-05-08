const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: "Pokemon",
    default: () => {
      return null;
    },
  },
  created_at: { type: Date, default: Date.now() },
  last_modified: { type: Date, default: Date.now() },
});

// Export model
module.exports = mongoose.model("Favorites", FavoriteSchema);
