const Genre = require("../models/genre");

// Display list of all Genre.
exports.genre_list = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Genre list");
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific Genre.
exports.genre_detail = async function (req, res, next) {
  try {
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
  } catch (error) {
    return next(error);
  }
};

// Display Genre create form on GET.
exports.genre_create_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Genre create GET");
  } catch (error) {
    return next(error);
  }
};

// Handle Genre create on POST.
exports.genre_create_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Genre create POST");
  } catch (error) {
    return next(error);
  }
};

// Display Genre delete form on GET.
exports.genre_delete_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Genre delete GET");
  } catch (error) {
    return next(error);
  }
};

// Handle Genre delete on POST.
exports.genre_delete_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Genre delete POST");
  } catch (error) {
    return next(error);
  }
};

// Display Genre update form on GET.
exports.genre_update_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Genre update GET");
  } catch (error) {
    return next(error);
  }
};

// Handle Genre update on POST.
exports.genre_update_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: Genre update POST");
  } catch (error) {
    return next(error);
  }
};
