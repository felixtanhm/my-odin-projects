const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let filePath = __dirname;
  let contentType = "";

  // Determine Routing
  switch (req.url) {
    case "/":
      filePath += "/public/index.html";
      res.statusCode = 200;
      break;
    case "/style.css":
      filePath += "/styles/style.css";
      res.statusCode = 200;
      break;
    case "/favicon.ico":
      filePath += "/assets/felixtanhm_nodejs.png";
      res.statusCode = 200;
      break;
    default:
      filePath += `/public${req.url}.html`;
      res.statusCode = 200;
      break;
  }

  // Determine Content-Type
  const reqExt = path.extname(req.url);
  switch (reqExt) {
    case ".css":
      contentType = "text/css";
      break;
    default:
      contentType = "text/html";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.setHeader("Content-Type", contentType);
            res.statusCode = 404;
            res.end(content, "utf8");
          }
        );
      } else {
        res.setHeader("Content-Type", contentType);
        res.statusCode = 500;
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.setHeader("Content-Type", contentType);
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || "8080";

server.listen(PORT);
