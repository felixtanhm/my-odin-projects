const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");
const { body, validationResult } = require("express-validator");

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
    // Get details of books, book instances for specific book
    const [book, bookInstances] = await Promise.all([
      Book.findById(req.params.id).populate("author").populate("genre").exec(),
      BookInstance.find({ book: req.params.id }).exec(),
    ]);

    if (book === null) {
      // No results.
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    res.render("book_detail", {
      title: book.title,
      book: book,
      book_instances: bookInstances,
    });
  } catch (error) {
    return next(error);
  }
};

// Display book create form on GET.
exports.book_create_get = async function (req, res, next) {
  try {
    // Get all authors and genres, which we can use for adding to our book.
    const [allAuthors, allGenres] = await Promise.all([
      Author.find().sort({ family_name: 1 }).exec(),
      Genre.find().sort({ name: 1 }).exec(),
    ]);

    res.render("book_form", {
      title: "Create Book",
      authors: allAuthors,
      genres: allGenres,
      book: null,
      errors: null,
    });
  } catch (error) {
    return next(error);
  }
};

// Handle book create on POST.
exports.book_create_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization.
  async function (req, res, next) {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Book object with escaped and trimmed data.
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre,
      });

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

        // Get all authors and genres for form.
        const [allAuthors, allGenres] = await Promise.all([
          Author.find().sort({ family_name: 1 }).exec(),
          Genre.find().sort({ name: 1 }).exec(),
        ]);

        // Mark our selected genres as checked.
        for (const genre of allGenres) {
          if (book.genre.includes(genre._id)) {
            genre.checked = "true";
          }
        }
        res.render("book_form", {
          title: "Create Book",
          authors: allAuthors,
          genres: allGenres,
          book: book,
          errors: errors.array(),
        });
      } else {
        // Data from form is valid. Save book.
        await book.save();
        res.redirect(book.url);
      }
    } catch (error) {
      return next(error);
    }
  },
];

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
    // Get book, authors and genres for form.
    const [book, allAuthors, allGenres] = await Promise.all([
      Book.findById(req.params.id).populate("author").exec(),
      Author.find().sort({ family_name: 1 }).exec(),
      Genre.find().sort({ name: 1 }).exec(),
    ]);

    if (book === null) {
      // No results.
      const err = new Error("Book not found");
      err.status = 404;
      return next(err);
    }

    // Mark our selected genres as checked.
    allGenres.forEach((genre) => {
      if (book.genre.includes(genre._id)) genre.checked = "true";
    });

    res.render("book_form", {
      title: "Update Book",
      authors: allAuthors,
      genres: allGenres,
      book: book,
      errors: null,
    });
  } catch (error) {
    return next(error);
  }
};

// Handle book update on POST.
exports.book_update_post = [
  // Convert the genre to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // Process request after validation and sanitization.
  async function (req, res, next) {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a Book object with escaped/trimmed data and old id.;
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: typeof req.body.genre === "undefined" ? [] : req.body.genre,
        _id: req.params.id, // This is required, or a new ID will be assigned!
      });

      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

        // Get all authors and genres for form
        const [allAuthors, allGenres] = await Promise.all([
          Author.find().sort({ family_name: 1 }).exec(),
          Genre.find().sort({ name: 1 }).exec(),
        ]);

        // Mark our selected genres as checked.
        for (const genre of allGenres) {
          if (book.genre.indexOf(genre._id) > -1) {
            genre.checked = "true";
          }
        }
        res.render("book_form", {
          title: "Update Book",
          authors: allAuthors,
          genres: allGenres,
          book: book,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid. Update the record.
        const updatedBook = await Book.findByIdAndUpdate(
          req.params.id,
          book,
          {}
        );
        // Redirect to book detail page.
        res.redirect(updatedBook.url);
      }
    } catch (error) {
      return next(error);
    }
  },
];
