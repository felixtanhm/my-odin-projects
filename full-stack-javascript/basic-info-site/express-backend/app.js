const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
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

app.use("/", (req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

const PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
  console.log("express is live");
});
