import configureContainer from './container';
const container = configureContainer();
import App from './app';
export const app = new App(container);

// const app = container.resolve('app');
module.exports = {
    container,
    app,
}