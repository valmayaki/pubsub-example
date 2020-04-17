const { createContainer, Lifetime, asClass, asFunction, asValue } = require('awilix');
const axios = require('axios');


function configureContainer(){

    const container = createContainer();


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
module.exports = configureContainer;
