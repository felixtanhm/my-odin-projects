const Users = require("../models/users");

exports.getUser = async function (req, res, next) {
  try {
    const currUser = await Users.findOne({ email: "felixtanhm@gmail.com" })
      .populate("favorites")
      .exec();

    res.status(200).json(currUser);
  } catch (error) {
    return next(error);
  }
};
