const {Router} = require('express'),
    {Server} = require('socket.io'),
    DataController = require('../controllers/data.controller')


/**
 * @param {Server} io
 */
const routerInit = (io) => {
    const router = Router()
    const dataController = new DataController(io)

    router.get("/", (_, response) => {
        response.render("index", {
            data: require('../../data.json')
        });
    });

    router.post('/', dataController.set)


    return router
}

module.exports = routerInit