const Users = require("../models/users");

exports.getUser = async function (req, res, next) {
  try {
    const currUser = await Users.findOne({
      email: "felixtanhm@gmail.com",
    }).exec();

    res.status(200).json(currUser);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async function (req, res, next) {
  try {
    const { objectId, favorites } = req.body;
    const updatedUser = await Users.updateOne(
      { _id: objectId },
      { $set: { favorites: favorites } }
    );

    if (updatedUser.acknowledged) {
      res.status(200).json(updatedUser);
    } else {
      const error = new Error(
        "Something went wrong while saving your favorites!"
      );
      error.status = 404;
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};
