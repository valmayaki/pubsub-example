const uuid = require('uuid').v4
class Event {
    constructor(data, topic){
        this.id = uuid();
        this.topic = topic;
        this.data = data
        this.topic.addEvent(this)
    }

    toString(){
        return JSON.stringify({
            data: this.data,
            topic: this.topic
        })
    }
}

module.exports = Event;