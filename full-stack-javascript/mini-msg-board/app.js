const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  console.log("render");
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("express is live");
});
