import { Router } from 'express';
import { AwilixContainer } from 'awilix';
import { ICradle } from '../container';
import TopicController from '../controllers/topicCtrl';
import EventController from '../controllers/eventCtrl';


export default function factory(container: AwilixContainer<ICradle>){
    const router = Router();
    router.get('/', (req, res) => {
        res.send('Hello World')
    });

    router.post('/subscribe/:topic', container.resolve<TopicController>('topicCtrl').subscribeUser)
    router.post('/publish/:topic', container.resolve<TopicController>('topicCtrl').publishEvent)
    router.post('/event', container.resolve<EventController>('eventCtrl').receiveEvent)
    return router;
}