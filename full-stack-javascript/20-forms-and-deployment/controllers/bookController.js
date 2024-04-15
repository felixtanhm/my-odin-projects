const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

exports.index = async function (req, res, next) {
  try {
    // Get details of books, book instances, authors and genre counts (in parallel)
    const [
      numBooks,
      numBookInstances,
      numAvailableBookInstances,
      numAuthors,
      numGenres,
    ] = await Promise.all([
      Book.countDocuments({}).exec(),
      BookInstance.countDocuments({}).exec(),
      BookInstance.countDocuments({ status: "Available" }).exec(),
      Author.countDocuments({}).exec(),
      Genre.countDocuments({}).exec(),
    ]);

    res.render("index", {
      title: "Local Library",
      book_count: numBooks,
      book_instance_count: numBookInstances,
      book_instance_available_count: numAvailableBookInstances,
      author_count: numAuthors,
      genre_count: numGenres,
    });
  } catch (error) {
    return next(error);
  }
};

// Display list of all books.
exports.book_list = async function (req, res, next) {
  try {
    const allBooks = await Book.find({}, "title author")
      .sort({ title: 1 })
      .populate("author")
      .exec();
    console.log(allBooks[0]);
    res.render("book_list", { title: "Book List", book_list: allBooks });
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific book.
exports.book_detail = async function (req, res, next) {
  try {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
  } catch (error) {
    return next(error);
  }
};

// Display book create form on GET.
exports.book_create_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Book create GET");
  } catch (error) {
    return next(error);
  }
};

// Handle book create on POST.
exports.book_create_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Book create POST");
  } catch (error) {
    return next(error);
  }
};

// Display book delete form on GET.
exports.book_delete_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Book delete GET");
  } catch (error) {
    return next(error);
  }
};

// Handle book delete on POST.
exports.book_delete_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Book delete POST");
  } catch (error) {
    return next(error);
  }
};

// Display book update form on GET.
exports.book_update_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Book update GET");
  } catch (error) {
    return next(error);
  }
};

// Handle book update on POST.
exports.book_update_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Book update POST");
  } catch (error) {
    return next(error);
  }
};
