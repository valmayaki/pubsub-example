import Topic from '../models/topic';

export default class TopicRepository {
    static topics: Topic[] = [];

    constructor(){}

    newTopic(topicName: string){
        const topic = new Topic(topicName);
        TopicRepository.topics.push(topic);
        return topic;
    }
    find(topicName: string){
        return TopicRepository.topics.find((topic) => {
            return topic.name === topicName;
        })
    }

    addSubscriberForTopic(topic: Topic, { callbackUrl }: { callbackUrl: string; }) {
        return topic.subscribe(callbackUrl);
    }

    findOrNew(topicName: string){
       let topic = this.find(topicName);
       if (topic){
           return topic;
       }
       return this.newTopic(topicName);

    }

    getSubscriptions(topic: Topic){
        return topic.getSubscriptions();
    }
}