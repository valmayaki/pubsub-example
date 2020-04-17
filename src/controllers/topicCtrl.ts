
import {v4 as uuid} from 'uuid';

import TopicService from '../services/topicService';
import { Request, Response } from 'express';
import { ICradle } from '../container';

export default class TopicController {
    topicService: TopicService;
    constructor({ topicService }: ICradle) {
        this.topicService = topicService
    }

    /**
     * @api {post} /subscribe/:topic Subscribe to a Topic
     * @apiName {SubscribeToTopic}
     * @apiParam {}
     * @param  {} request
     * @param  {} response
     */
    subscribeUser = (request: Request, response: Response) => {
        const topicName = request.params.topic;
        // const client = request.client;
        const url = request.body.url;
        const subscription = this.topicService.subscribe(topicName, url)
        response.status(201).json({
            subscriptionId: subscription.id,
            topic: subscription.topic.name,
            createdAt: subscription.createdAt,
            callbackUrl: subscription.callbackUrl
        })
    }

    /**
     * @api {post} /publish/:topic Publish event to a Topic
     * @apiName {PublishEventTotopic}
     * @param  {} request
     * @param  {} response
     */
    publishEvent = async (request: Request, response: Response) => {
        const topicName = request.params.topic;
        const data  = request.body;
        const event =await this.topicService.publish(topicName, data);
        response.status(200).json({
            eventId: event.id,
            topic: event.topic.name,
            data: event.data
        })
    }
}