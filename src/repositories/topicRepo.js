const Topic = require('../models/topic');

class TopicRepository {
    static topics = [];
    constructor(){}

    newTopic(name){
        const topic = new Topic(name);
        TopicRepository.topics.push(topic);
        return topic;
    }
    find(topicName){
       return TopicRepository.topics.find((topic) => {
           return topic.name === topicName;
       })
    }
    findOrNew(topicName){
       let topic = this.find(topicName);
       if (topic){
           return topic;
       }
       return this.newTopic(topicName);

    }
    getSubscriptions(topic){
        return topic.getSubscriptions();
    }
}
module.exports = TopicRepository