var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", userController.getUser);

router.get("/favorites", userController.getFavorites);

router.post("/", userController.updateUser);

module.exports = router;
