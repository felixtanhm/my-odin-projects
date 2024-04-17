const Book = require("../models/book");
const BookInstance = require("../models/bookinstance");
const { body, validationResult } = require("express-validator");

// Display list of all BookInstances.
exports.bookinstance_list = async function (req, res, next) {
  try {
    const allBookInstances = await BookInstance.find().populate("book").exec();
    res.render("bookinstance_list", {
      title: "Book Instance List",
      bookinstance_list: allBookInstances,
    });
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async function (req, res, next) {
  try {
    const bookInstance = await BookInstance.findById(req.params.id)
      .populate("book")
      .exec();

    if (bookInstance === null) {
      // No results.
      const err = new Error("Book copy not found");
      err.status = 404;
      return next(err);
    }

    res.render("bookinstance_detail", {
      title: "Book:",
      instance: bookInstance,
    });
  } catch (error) {
    return next(error);
  }
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async function (req, res, next) {
  try {
    const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: allBooks,
      selected_book: null,
      errors: null,
      bookInstance: null,
    });
  } catch (error) {
    return next(error);
  }
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async function (req, res, next) {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a BookInstance object with escaped and trimmed data.
      const bookInstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back,
      });

      if (!errors.isEmpty()) {
        // There are errors.
        // Render form again with sanitized values and error messages.
        const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: allBooks,
          selected_book: bookInstance.book._id,
          errors: errors.array(),
          bookInstance: bookInstance,
        });
        return;
      } else {
        // Data from form is valid
        await bookInstance.save();
        res.redirect(bookInstance.url);
      }
    } catch (error) {
      return next(error);
    }
  },
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = async function (req, res, next) {
  try {
    const bookinstance = await BookInstance.findById(req.params.id)
      .populate("book")
      .exec();

    if (bookinstance === null) {
      res.redirect("/catalog/bookinstances");
    }

    res.render("bookinstance_delete", {
      title: "Delete Book Instance",
      instance: bookinstance,
    });
  } catch (error) {
    return next(error);
  }
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = async function (req, res, next) {
  try {
    const bookinstance = await BookInstance.findById(req.params.id).exec();

    if (bookinstance !== null) {
      await BookInstance.findByIdAndDelete(req.body.instanceid);
    }

    res.redirect("/catalog/bookinstances");
  } catch (error) {
    return next(error);
  }
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = async function (req, res, next) {
  try {
    const [bookinstance, allBooks] = await Promise.all([
      BookInstance.findById(req.params.id).populate("book").exec(),
      Book.find({}, "title").sort({ title: 1 }).exec(),
    ]);
    res.render("bookinstance_form", {
      title: "Update Book Copy",
      book_list: allBooks,
      selected_book: bookinstance.book._id,
      errors: null,
      bookInstance: bookinstance,
    });
  } catch (error) {
    return next(error);
  }
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      const bookinstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back,
        _id: req.params.id,
      });

      if (!errors.isEmpty()) {
        const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

        res.render("bookinstance_form", {
          title: "Update Book Copy",
          book_list: allBooks,
          selected_book: bookinstance.book._id,
          errors: errors.array(),
          bookInstance: bookinstance,
        });
        return;
      } else {
        const updatedBookInstance = await BookInstance.findByIdAndUpdate(
          req.params.id,
          bookinstance
        );
        res.redirect(updatedBookInstance.url);
      }
    } catch (error) {
      return next(error);
    }
  },
];
