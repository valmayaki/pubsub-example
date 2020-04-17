import { createContainer, Lifetime, asClass, asFunction, asValue } from 'awilix';

import axios from 'axios';
import TopicController from './controllers/topicCtrl';
import EventController from './controllers/eventCtrl';
import TopicService from './services/topicService';
import TopicRepository from './repositories/topicRepo';

export interface ICradle {
    topicCtrl: TopicController
    eventCtrl: EventController
    topicService: TopicService
    topicRepo: TopicRepository
    [key: string]: any
}
export default function configureContainer(){

    const container = createContainer<ICradle>();


    container.loadModules([
        ['src/middlewares/**/*.js', {register: asFunction, lifetime: Lifetime.SINGLETON}],
        ['src/models/**/*.js', {register: asValue, lifetime: Lifetime.SINGLETON}],
        'src/repositories/**/*.js',
        'src/controllers/**/*.js',
        'src/services/**/*.js'
    ],{
        formatName: 'camelCase',
        resolverOptions: {
            // We can give these auto-loaded modules
            // the deal of a lifetime! (see what I did there?)
            // By default it's `TRANSIENT`.
            lifetime: Lifetime.SINGLETON,
            register: asClass
        }
    })
    container.register({
        httpClient: asFunction(() => axios)
    });
    return container;
}