const express = require("express");
const router = express.Router();

const messages = [
  {
    text: "hi",
    user: "John",
    date: new Date(),
  },
  {
    text: "hi2",
    user: "Jane",
    date: new Date(),
  },
];

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Mini Message Board", messages });
});

router.get("/new", (req, res, next) => {
  res.render("newForm", { title: "Mini Message Board" });
});

router.post("/new", (req, res, next) => {
  console.log("form submitted");
  console.log(req.body);
  messages.push({
    text: req.body.message,
    user: "Admin Felix",
    date: new Date(),
  });
  res.redirect("/");
});

module.exports = router;
