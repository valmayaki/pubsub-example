const Router = require('express').Router;


function factory(container){
    const router = Router();
    router.get('/', (req, res) => {
        res.send('Hello World')
    });

    router.post('/subscribe/:topic', container.resolve('topicCtrl').subscribeUser)
    router.post('/publish/:topic', container.resolve('topicCtrl').publishEvent)
    router.post('/event', container.resolve('eventCtrl').receiveEvent)
    return router;
}
module.exports = factory