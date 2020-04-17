const Subscription = require('./subscription');
class Topic {
    events = []
    subcriptions = []
    constructor(topicName){
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
    addSubscription(subscription){
        this.subcriptions.push(subscription);
    }

    /**
     * Notifies all Subscribers of the event for this topic
     *
     * @param {Event} event
     */
    notfiySubscribers(event){
        return new Promise((resolve) =>{

            const notifyPromises = this.subcriptions.map(subscription => {
                subscription.notify(event)
            })
            Promise.all(notifyPromises).then((responses)=>{
                resolve(responses)
            })
        })

    }

    /**
     * Subscribe a callbackUrl for a topic
     * if an event exist for topic this will send the last event to callbackUrl
     *
     * @param  {string} callbackUrl
     */
    subscribe(callbackUrl){
        const subscription = new Subscription(this, callbackUrl);
        this.subcriptions.push(subscription);
        return subscription;
    }

    /**
     * Publish an event to subscribers
     *
     *
     * @param {Event} event
     */
    publish(event){
        return this.notfiySubscribers(event)
    }

    /**
     * Adds Event to topic
     * @param {Event} event
     */
    addEvent(event){
        this.events.push(event)
    }
}
module.exports = Topic