var express = require("express");
var router = express.Router();
const pokeController = require("../controllers/pokeController");

/* GET Pokemon List */
router.get("/pokemon", pokeController.pokeList);

router.get("/pokemon/:pokemonId", function (req, res, next) {
  console.log("get individual pokemon: " + `${req.params.pokemonId}`);
});

module.exports = router;
