const mongoose = require("mongoose");
const { formatRelative } = require("date-fns");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

// Virtual for bookinstance's Due Back
BookInstanceSchema.virtual("due_date").get(function () {
  // We don't use an arrow function as we'll need the this object
  return this.due_back
    ? formatRelative(new Date(`${this.due_back}`), new Date())
    : "";
});

// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
