const Genre = require("../models/genre");
const Book = require("../models/book");

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
      genre_books: booksInGenre,
    });
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
