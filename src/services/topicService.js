const Event = require('../models/event');

class TopicService {
    constructor({topicRepo, httpClient}){
        this.topicRepo = topicRepo;
        this.httpClient = httpClient;
    }

    /**
     * Publish event to subscribers
     *
     * @param {string} topicName
     *
     * @param {data} object
     *
     * @returns {Promise<any>}
     */
    publish(topicName, data){
        const topic = this.topicRepo.findOrNew(topicName)
        // const client = request.client;
        const event = new Event(data, topic);
        const subscriptions = this.topicRepo.getSubscriptions(event.topic);
        const promiseNotify = subscriptions.map(subscription => {
            return this.notify(event, subscription)
        });
        return Promise.all(promiseNotify).then(responses => {
            return event;
        });
    }

    /**
     * Notifies subscriber of this subscription through the callbackUrl
     *
     * @param {Event} event
     * This is the event model
     *
     * @param {Subscription} subscription
     * This is the Subscription Model
     *
     * @returns {Promise<any>}
     */
    notify(event, subscription){
        return this.httpClient.post(
            subscription.callbackUrl,
            JSON.stringify({topic: subscription.topic.name,  data: event.data}),
            { headers: {'Content-Type': 'application/json'} }
        )
    }

    /**
     * Creates a Subscription for the topic
     *
     * @param {string} topicName
     * Topic name
     *
     * @param {string} callbackUrl
     * callback url for sending events
     *
     * @returns {Subscription}
     */
    subscribe(topicName, callbackUrl){
        const topic = this.topicRepo.findOrNew(topicName);
        const subscription = topic.subscribe(callbackUrl);
        return subscription;
    }
}
module.exports = TopicService