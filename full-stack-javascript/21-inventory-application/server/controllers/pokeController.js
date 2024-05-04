const axios = require("axios");

exports.pokeList = async function (req, res, next) {
  console.log("pokelist");
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=24"
    );
    // const results = await response.json();
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
