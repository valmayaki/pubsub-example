const uuid = require('uuid').v4;
const Subscription = require('./subscription');
class Client {
    static clients = [];

    events = [];
    subscriptions = [];


    constructor(url) {
        this.id = uuid();
        this.url = url;
    }

    publish(event, topic) {
        event.setPublisher(this);
        topic.add(event);
    }
    subscribe(topic, callbackUrl) {
        const subscription = new Subscription(topic, this, callbackUrl)
        topic.addSubscription(subscription);
        this.subscription.push(subscription);
        return subscription;
    }
    notify(event){
        this.event.push(event)
    }
    static new(){
        const client = new Client();
        Client.clients.push(client)
        return client;

    }
    static find(id){
        return Client.clients.find((client, index) => {
            return client.id === id
        });
    }
    getEvents(){
        const events =  this.events;
        this.events = [];
        return events
    }
}

module.exports = Client