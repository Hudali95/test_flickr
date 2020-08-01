const http = require("http");
const path = require("path");

const express = require("express");
const config = require("config");

const api = require("./api");

const app = express();

app.use(function (req, res, next) {
  var allowedOrigins = config.allowedOrigins;

  if (allowedOrigins.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  res.header("Access-Control-Allow-Credentials", "true");

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  if ("OPTIONS" === req.method) {
    return res.sendStatus(200);
  }
  next();
});

const port = "4000";
app.set("port", port);

app.use("/", api);

module.exports = app;

const server = http.createServer(app);
server.listen(port, () => {
  console.log("server is listening", port);
});
