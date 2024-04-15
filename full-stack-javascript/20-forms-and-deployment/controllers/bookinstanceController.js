const BookInstance = require("../models/bookinstance");
const { formatRelative } = require("date-fns");

// Display list of all BookInstances.
exports.bookinstance_list = async function (req, res, next) {
  try {
    const allBookInstances = await BookInstance.find().populate("book").exec();
    console.log(allBookInstances[0]);
    res.render("bookinstance_list", {
      title: "Book Instance List",
      bookinstance_list: allBookInstances,
      formatRelative,
    });
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async function (req, res, next) {
  try {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
  } catch (error) {
    return next(error);
  }
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: BookInstance create GET");
  } catch (error) {
    return next(error);
  }
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: BookInstance create POST");
  } catch (error) {
    return next(error);
  }
};

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: BookInstance delete GET");
  } catch (error) {
    return next(error);
  }
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: BookInstance delete POST");
  } catch (error) {
    return next(error);
  }
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: BookInstance update GET");
  } catch (error) {
    return next(error);
  }
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = async function (req, res, next) {
  try {
    res.send("NOT IMPLEMENTED: BookInstance update POST");
  } catch (error) {
    return next(error);
  }
};
