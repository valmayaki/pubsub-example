const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const { asValue } = require('awilix');

const { join } = require('path');
const http = require('http')


class App {
    constructor(container){
        this.container = container || require('./container');

        const kernel = express();
        this.kernel = kernel;
        this.setup(this.kernel);
        this.container.register({
            app: asValue(this)
        });
    }

    getContainer(){
        return this.container;
    }
    setup(app){
        app.use(cors());
        app.use(express.json()) // for parsing application/json
        // app.use(express.urlencoded({ extended: true }))
        app.use(router(this.container));
        app.use(morgan('combined'));
    }

    handle = (req, res, next) => {
        this.kernel.handle(req, res, next)
    }
    start(){
        const packageJson = require(join(process.cwd(), 'package.json'));
        const name = process.env.NODE_SERVER_NAME || packageJson.name;

        const port  = process.env.NODE_PORT || 3003;


        this.listen(port, () => console.log(`${name} listening at http://localhost:${port}`))
    }

    listen(){
        const server = http.createServer(this.handle)
        server.listen.apply(server, arguments);
    }
}

module.exports = App