const Author = require("../models/author");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");

// Display list of all Authors.
exports.author_list = async function (req, res, next) {
  try {
    const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
    res.render("author_list", {
      title: "Author List",
      author_list: allAuthors,
    });
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific Author.
exports.author_detail = async function (req, res, next) {
  try {
    // Get details of author and all their books (in parallel)
    const [author, allBooksByAuthor] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec(),
    ]);

    if (author === null) {
      // No results.
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }

    res.render("author_detail", {
      title: "Author Detail",
      author: author,
      author_books: allBooksByAuthor,
    });
  } catch (error) {
    return next(error);
  }
};

// Display Author create form on GET.
exports.author_create_get = async function (req, res, next) {
  try {
    res.render("author_form", {
      title: "Create Author",
      author: null,
      errors: null,
    });
  } catch (error) {
    return next(error);
  }
};

// Handle Author create on POST.
exports.author_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("date_of_death", "Invalid date of death")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async function (req, res, next) {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create Author object with escaped and trimmed data
      const author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("author_form", {
          title: "Create Author",
          author: author,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.

        // Save author.
        await author.save();
        // Redirect to new author record.
        res.redirect(author.url);
      }
    } catch (error) {
      return next(error);
    }
  },
];

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
