const container = require('../container');
const route = require('express').Router();


route.get('/', (req, res) => {
    res.send('Hello World')
});

route.post('/subscribe/:topic', container.resolve('topicCtrl').subscribeUser)
route.post('/publish/:topic', container.resolve('topicCtrl').publishEvent)
route.post('/event', container.resolve('eventCtrl').receiveEvent)
// route.get('/event', container.resolve('eventCtrl').getEvents)

module.exports = route