const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let filePath = "";
  let contentType = "";
  if (req.url === "/favicon.ico") {
    filePath = path.join(__dirname, "assets", "felixtanhm_nodejs.png");
    contentType = "text/html";
  } else if (req.url === "/style.css") {
    filePath = path.join(__dirname, "styles", "style.css");
    contentType = "text/css";
  } else if (req.url === "/") {
    filePath = path.join(__dirname, "public", "index.html");
    contentType = "text/html";
  } else {
    filePath = path.join(__dirname, "public", `${req.url}.html`);
    contentType = "text/html";
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || "8080";

server.listen(PORT, () => console.log("server is running"));
