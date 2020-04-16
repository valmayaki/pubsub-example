const container = require('../container');
const route = require('express').Router();


route.get('/', (req, res) => {
    res.send('Hello World')
});

route.post('/subscribe/:topic', container.resolve('topicCtrl').subscribeUser)

module.exports = route