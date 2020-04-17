import { Express, Request, Response, NextFunction, Application as ExpressApp, Handler } from 'express';
import express from 'express';
import router from './routes';
import { AwilixContainer } from 'awilix';
import { ICradle } from './container';
import { RequestListener, IncomingMessage, ServerResponse, Server } from 'http';
import cors  from 'cors';
import morgan from 'morgan';
import { asValue } from 'awilix';

import { join } from 'path';
import  * as http  from 'http'
export type  RequestHandler = Handler & http.RequestListener

export default class App {
    container: AwilixContainer<ICradle>
    kernel: Express;
    constructor(container: AwilixContainer){
        this.container = container || require('./container')();

        const kernel = express();
        this.kernel = kernel;
        this.setup(this.kernel);
        this.container.register({
            app: asValue(this)
        });
    }

    getContainer(): AwilixContainer<ICradle>{
        return this.container;
    }
    setup(app: Express){
        app.use(cors());
        app.use(express.json()) // for parsing application/json
        // app.use(express.urlencoded({ extended: true }))
        app.use(router(this.container));
        app.use(morgan('combined'));
    }

    handle: RequestListener  = (request: IncomingMessage, response: ServerResponse ) => {
        return this.kernel(request, response)
    }
    start(){
        const packageJson = require(join(process.cwd(), 'package.json'));
        const name = process.env.NODE_SERVER_NAME || packageJson.name;

        const port  = process.env.NODE_PORT || 3003;


        this.listen(port, () => console.log(`${name} listening at http://localhost:${port}`))
    }

    listen(...args: any[]){
        const server: http.Server = http.createServer(this.handle)
        server.listen.apply<Server, any[], Server>(server, args);
        return server;
    }
}