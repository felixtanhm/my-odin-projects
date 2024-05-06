const axios = require("axios");

exports.pokeList = async function (req, res, next) {
  console.log("pokelist");
  console.log(req);
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=24"
    );

    res.status(200);
    res.send({ ...response.data });
  } catch (error) {
    return next(error);
  }
};
