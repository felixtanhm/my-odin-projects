const mongoose = require("mongoose");
const { formatRelative } = require("date-fns");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

// Virtual for author's DOB & DOD
AuthorSchema.virtual("life").get(function () {
  // We don't use an arrow function as we'll need the this object
  const dob = this.date_of_birth
    ? formatRelative(new Date(`${this?.date_of_birth}`), new Date())
    : "";
  const dod = this.date_of_death
    ? formatRelative(new Date(`${this?.date_of_death}`), new Date())
    : "";
  if (this.date_of_birth && this.date_of_death) {
    return `(${dob} - ${dod})`;
  } else if (this.date_of_birth) {
    return `(${dob} - Present)`;
  } else {
    return "(Unknown)";
  }
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);
