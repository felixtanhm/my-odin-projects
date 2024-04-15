const Book = require("../models/book");

exports.index = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Site Home Page");
  } catch (error) {
    return next(error);
  }
};

// Display list of all books.
exports.book_list = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Book list");
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
