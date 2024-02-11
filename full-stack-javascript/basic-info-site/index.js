const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const pathURL = req.url;
  console.log(pathURL);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("hello world");
});

const PORT = process.env.PORT || "8080";

server.listen(PORT, () => console.log("server is running"));
