require("dotenv").config();
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");

// Get DB variables from environment.
const mongoDb = process.env.MONGO_DB;
const mongoURI = process.env.MONGO_URI;
const uri = `${mongoURI}/${mongoDb}?retryWrites=true&w=majority`;

async function connectDB() {
  await mongoose.connect(uri);
  console.log("db connected");
}
connectDB().catch((err) => console.log(err));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("public"));
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
