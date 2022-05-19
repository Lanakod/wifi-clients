const hbs = require("hbs"),
  parseData = require("./parse-data.helper"),
  clientsCount = require("./clients-count.helper");

const hbsHelpers = () => {
  hbs.registerHelper(parseData.name, parseData.callback);
  hbs.registerHelper(clientsCount.name, clientsCount.callback);
};

module.exports = hbsHelpers;
