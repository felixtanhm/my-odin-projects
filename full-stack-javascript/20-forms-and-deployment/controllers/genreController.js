const Genre = require("../models/genre");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.genre_list = async function (req, res, next) {
  try {
    const allGenres = await Genre.find().sort({ name: 1 }).exec();
    res.render("genre_list", {
      title: "Genre List",
      genre_list: allGenres,
    });
  } catch (error) {
    return next(error);
  }
};

// Display detail page for a specific Genre.
exports.genre_detail = async function (req, res, next) {
  try {
    // Get details of genre and all associated books (in parallel)
    const [genre, booksInGenre] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }, "title summary").exec(),
    ]);
    if (genre === null) {
      // No results.
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    res.render("genre_detail", {
      title: `Genre Detail: ${genre.name}`,
      genre: genre,
      genre_books: booksInGenre,
    });
  } catch (error) {
    return next(error);
  }
};

// Display Genre create form on GET.
exports.genre_create_get = async function (req, res, next) {
  try {
    res.render("genre_form", {
      title: "Create Genre",
      genre: null,
      errors: null,
    });
  } catch (error) {
    return next(error);
  }
};

// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate and sanitize the name field.
  body("name", "Genre name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  // Process request after validation and sanitization.
  async function (req, res, next) {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a genre object with escaped and trimmed data.
      const genre = new Genre({ name: req.body.name });

      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("genre_form", {
          title: "Create Genre",
          genre: genre,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
        // Check if Genre with same name already exists.
        const genreExists = await Genre.findOne({ name: req.body.name }).exec();
        if (genreExists) {
          // Genre exists, redirect to its detail page.
          res.redirect(genreExists.url);
        } else {
          await genre.save();
          // New genre saved. Redirect to genre detail page.
          res.redirect(genre.url);
        }
      }
    } catch (error) {
      return next(error);
    }
  },
];

// Display Genre delete form on GET.
exports.genre_delete_get = async function (req, res, next) {
  try {
    // Get details of genre and all the books (in parallel)
    const [genre, allBooksByGenre] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }, "title summary").exec(),
    ]);

    if (genre === null) {
      // No results.
      res.redirect("/catalog/genres");
    }

    res.render("genre_delete", {
      title: "Delete Genre",
      genre: genre,
      genre_books: allBooksByGenre,
    });
  } catch (error) {
    return next(error);
  }
};

// Handle Genre delete on POST.
exports.genre_delete_post = async function (req, res, next) {
  try {
    // Get details of genre and all the books (in parallel)
    const [genre, allBooksByGenre] = await Promise.all([
      Genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }, "title summary").exec(),
    ]);

    if (allBooksByGenre.length > 0) {
      // Genre has books. Render in same way as for GET route.
      res.render("genre_delete", {
        title: "Delete Genre",
        genre: genre,
        genre_books: allBooksByGenre,
      });
      return;
    } else {
      // Genre has no books. Delete object and redirect to the list of genres.
      await Genre.findByIdAndDelete(req.body.genreid);
      res.redirect("/catalog/genres");
    }
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
