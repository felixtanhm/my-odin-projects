const express = require("express");

const app = express();

app.get("/favicon.ico", (req, res) => {
  res.sendFile("./assets/felixtanhm_nodejs.png", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./views/contact.html", { root: __dirname });
});

app.get("/style.css", (req, res) => {
  res.sendFile("./styles/style.css", { root: __dirname });
});

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.use("/", (req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

const PORT = process.env.PORT || "8080";

app.listen(PORT);
