import {v4 as uuid} from 'uuid';
import Topic from './Topic';

export default class Subscription {
    id: string;
    topic: Topic;
    callbackUrl: string;
    createdAt: number;

    /**
     * Creates new Subscription
     *
     * @param  {Topic} topic model
     * @param  {string} callbackUrl
     */
    constructor(topic: Topic, callbackUrl: string){
        this.id = uuid()
        this.topic = topic;
        this.callbackUrl = callbackUrl;
        this.createdAt = Date.now();
    }
}