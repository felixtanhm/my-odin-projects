const express = require("express");
const router = express.Router();
const Message = require("../models/messages");
const { formatRelative } = require("date-fns");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const [messages, messageCount] = await Promise.all([
      Message.find({}).sort({ createdAt: "desc" }).exec(),
      Message.countDocuments({}).exec(),
    ]);
    console.log(messages);
    res.render("index", {
      title: "Motivational Messages",
      messages,
      messageCount,
      formatRelative,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/new", (req, res, next) => {
  res.render("newForm", { title: "Create New Motivational Message" });
});

router.post("/new", async (req, res, next) => {
  const message = new Message({
    username: req.body.username,
    content: req.body.message,
  });
  await message.save();
  res.redirect("/");
});

module.exports = router;
