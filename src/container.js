const {createContainer, Lifetime, asClass} = require('awilix');

const container = createContainer();

container.loadModules([
    'src/controllers/**/*.js',
    'src/models/**/*.js',
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

module.exports = container;
