
const uuidV4 = require('uuid').v4;
const Topic = require('../models/topic');
const Event = require('../models/event')

class TopicController {

    constructor({ topicRepo, eventService }) {
        this.topicRepo = topicRepo
        this.eventService = eventService;
    }

    /**
     * @api {post} /subscribe/:topic Subscribe to a Topic
     * @apiName {SubscribeToTopic}
     * @apiParam {}
     * @param  {} request
     * @param  {} response
     */
    subscribeUser = (request, response) => {
        const topicName = request.params.topic;
        // const client = request.client;
        const url = request.body.url;
        const topic = this.topicRepo.findOrNew(topicName);
        const subscription = topic.subscribe(url);
        response.status(201).json({
            subscriptionId: subscription.id,
            topic: subscription.topic.name,
            createdAt: subscription.createdAt,
            callbackUrl: subscription.callbackUrl
        })
    }

    /**
     * @api {post} /publish/:topic Publish event to a Topic
     * @apiName {PublishEventTotopic}
     * @param  {} request
     * @param  {} response
     */
    publishEvent = async (request, response) => {
        const topicName = request.params.topic;
        const topic = this.topicRepo.findOrNew(topicName)
        const data  = request.body;
        // const client = request.client;
        const event = new Event(data, topic);
        await this.eventService.publish(event);
        response.status(200).json({
            eventId: '',
            topic: topic.name,
            data: event.data
        })
    }
}
module.exports = TopicController