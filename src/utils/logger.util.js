const fs = require("fs"),
  path = require("path"),
  config = require("../../config.json");
const moment = require("moment");

/**
 * @param {string} msg
 */
const logger = (msg) => {
  if (config.logging) fs.appendFileSync(path.resolve("connection.log"), msg);
};

module.exports = logger;
