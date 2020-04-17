class Event {
    constructor(data, topic){
        this.topic = topic;
        this.data = data
        this.topic.addEvent(this)
    }


    /**
     * Publishes this event to subscribers of a topic
     *
     * @return {Promise<any>}
     */
    publish(){
        return this.topic.publish(this)
    }

    static new(data, topic){
        return new Event(data, topic)
    }

    toString(){
        return JSON.stringify({
            data: this.data,
            topic: this.topic
        })
    }
}

module.exports = Event;