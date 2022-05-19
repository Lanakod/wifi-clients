const express = require("express"),
  http = require("http"),
  routerInit = require("./routes/index"),
  handlebars = require("./handlebars"),
  config = require("../config.json"),
  { Server } = require("socket.io"),
  path = require("path"),
  JsonInit = require("./utils/json-init.util");
const fs = require("fs");

/**
 * @param {Express} app
 */

const bootstrap = (app) => {
  setInterval(() => {
    const date = new Date(Date.now());
    if (date.getHours() === 0) {
      console.log(
        `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] - JSON has been cleared!`
      );
      JsonInit();
    }
  }, 60 * 60 * 1000);
  JsonInit();

  handlebars(app);

  const httpServer = http.createServer(app);
  const io = new Server(httpServer);
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.static(path.resolve("public")));
  app.use(routerInit(io));

  const port = config.port || 3000;
  httpServer.listen(port, () => {
    console.log("Server started. Port: " + port);
  });
};

module.exports = bootstrap;
