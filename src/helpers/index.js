const hbs = require("hbs"),
    parseData = require('./parse-data.helper')

const hbsHelpers = () => {
    hbs.registerHelper(parseData.name, parseData.callback);
}

module.exports = hbsHelpers