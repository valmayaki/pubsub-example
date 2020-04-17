import Event from '../models/event';
import TopicRepository from '../repositories/topicRepo';
import Subscription from '../models/subscription';
import { AwilixContainer } from 'awilix';
import { ICradle } from '../container';

export default class TopicService {
    topicRepo: TopicRepository;
    httpClient: any;

    constructor({topicRepo, httpClient}: {topicRepo: TopicRepository, httpClient: any}){
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
     * @returns {Promise<Event>}
     */
    publish(topicName: string, data: any): Promise<Event>{
        const topic = this.topicRepo.findOrNew(topicName)
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
    notify(event: Event, subscription: Subscription): Promise<any>{
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
    subscribe(topicName: string, callbackUrl: string): Subscription{
        const topic = this.topicRepo.findOrNew(topicName);
        const subscription = this.topicRepo.addSubscriberForTopic(topic, { callbackUrl });
        return subscription;
    }
}