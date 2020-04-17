const uuid = require('uuid').v4;
const axios = require('axios');
const container = require('../container');

class Subscription {

    /**
     * Creates new Subscription
     *
     * @param  {Topic} topic model
     * @param  {string} callbackUrl
     */
    constructor(topic, callbackUrl ){
        this.id = uuid()
        this.topic = topic;
        this.callbackUrl = callbackUrl;
        this.createdAt = Date.now();
    }
}

module.exports = Subscription;