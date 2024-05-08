const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  last_modified: { type: Date, default: Date.now() },
});

// Export model
module.exports = mongoose.model("Users", UserSchema);
