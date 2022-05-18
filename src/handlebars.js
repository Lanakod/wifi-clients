const hbs = require('hbs'),
    hbsHelpers = require('./helpers/index')

/**
 * @param {Express} app
 */
const handlebars = (app) => {
    hbsHelpers(hbs)
    app.set("view engine", "hbs");
}

module.exports = handlebars