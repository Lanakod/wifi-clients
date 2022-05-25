const { Router } = require("express"),
  { Server } = require("socket.io"),
  DataController = require("../controllers/data.controller"),
  jsonInit = require("../utils/json-init.util");

/**
 * @param {Server} io
 */
const routerInit = (io) => {
  const router = Router();
  const dataController = new DataController(io);

  router.get("/", (_, response) => {
    return response.render("index");
  });

  router.get("/clear", async (req, res) => {
    jsonInit();
    return res.redirect("/");
  });

  router.post("/", dataController.set);
  router.post("/del", dataController.del);
  router.get("/fetch", dataController.fetch);

  return router;
};

module.exports = routerInit;
