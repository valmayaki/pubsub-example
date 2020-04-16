const container = require('../container');
const route = require('express').Router();


route.get('/', (req, res) => {
    res.send('Hello World')
});

route.post('/subscribe/:topic', container.resolve('subscriptionCtrl').subscribeUser)

module.exports = route