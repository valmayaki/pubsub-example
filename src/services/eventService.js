class EventService {
    constructor({ httpClient }){
        this.httpClient = httpClient;
    }
    /**
     * Publish event to subscribers
     *
     * @param {Event} event
     */
    publish(event){
        const subscriptions = event.topic.getSubscriptions();
        const promiseNotify = subscriptions.map(subscription => {
            return this.httpClient.post(
                subscription.callbackUrl,
                JSON.stringify({topic: subscription.topic.name,  data: event.data}),
                { headers: {'Content-Type': 'application/json'} }
            )
        });
        return Promise.all(promiseNotify).then(responses => {
            return responses;
        });
    }
}
module.exports = EventService