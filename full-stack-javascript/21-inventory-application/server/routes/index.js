var express = require("express");
var router = express.Router();
const pokeController = require("../controllers/pokeController");

/* GET Pokemon List */
router.get("/pokemon", pokeController.pokeList);

router.get("/pokemon/:dexId", pokeController.pokeDetails);

module.exports = router;
