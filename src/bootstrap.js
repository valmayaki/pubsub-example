const configureContainer = require('./container')
const container = configureContainer()
const App = require('./app');
const app = new App(container);

// const app = container.resolve('app');
module.exports = {
    container,
    app,
}