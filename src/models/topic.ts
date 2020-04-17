import Subscription from './subscription';
import Event from './event';
export default class Topic {
    events: Event[] = []
    subcriptions: Subscription[] = [];
    name: string;
    constructor(topicName: string){
        this.name = topicName;
    }

    /**
     * Get all subscriptions for this topic
     * @returns {Subscripton[]}
     */
    getSubscriptions(){
        return this.subcriptions
    }

    /**
     * Adds to the subscriptions for this topic
     *
     * @param {Subscription} subscription
     */
    addSubscription(subscription: Subscription){
        this.subcriptions.push(subscription);
    }

    /**
     * Subscribe a callbackUrl for a topic
     * if an event exist for topic this will send the last event to callbackUrl
     *
     * @param  {string} callbackUrl
     */
    subscribe(callbackUrl: string){
        const subscription = new Subscription(this, callbackUrl);
        this.subcriptions.push(subscription);
        return subscription;
    }

    /**
     * Adds Event to topic
     * @param {Event} event
     */
    addEvent(event: Event){
        this.events.push(event)
    }
}