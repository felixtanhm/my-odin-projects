const Author = require("../models/author");
const Book = require("../models/book");

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
