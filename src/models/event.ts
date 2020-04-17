import {v4 as uuid} from 'uuid';
import Topic from '../models/Topic';
export default class Event {
    id: string
    topic: Topic
    data: any
    constructor(data: any, topic: Topic){
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