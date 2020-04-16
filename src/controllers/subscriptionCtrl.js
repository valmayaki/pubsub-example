
const uuidV4 = require('uuid').v4;

class SubscriptionController {

    constructor(){}

    /**
     * @api {post} /subscribe/:topic Subscribe to a Topic
     * @apiName {SubscribeToTopic}
     * @apiParam {}
     * @param  {} request
     * @param  {} response
     */
    subscribeUser = (request, response) => {
        const topic = request.params.topic;
        const createdAt = Date.now()
        response.status(201).json({
            subscriptionId: uuidV4(),
            topic,
            createdAt: createdAt
        })
    }
}
module.exports = SubscriptionController