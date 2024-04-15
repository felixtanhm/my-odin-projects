const Author = require("../models/author");

// Display list of all Authors.
exports.author_list = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Author list");
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific Author.
exports.author_detail = async function (req, res, next) {
  try {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  } catch (error) {
    return next(error);
  }
};

// Display Author create form on GET.
exports.author_create_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Author create GET");
  } catch (error) {
    return next(error);
  }
};

// Handle Author create on POST.
exports.author_create_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Author create POST");
  } catch (error) {
    return next(error);
  }
};

// Display Author delete form on GET.
exports.author_delete_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Author delete GET");
  } catch (error) {
    return next(error);
  }
};

// Handle Author delete on POST.
exports.author_delete_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Author delete POST");
  } catch (error) {
    return next(error);
  }
};

// Display Author update form on GET.
exports.author_update_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Author update GET");
  } catch (error) {
    return next(error);
  }
};

// Handle Author update on POST.
exports.author_update_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Author update POST");
  } catch (error) {
    return next(error);
  }
};
