
const { join } = require('path');

const app = require('./app');

// const app = container.resolve('app');

const packageJson = require(join(process.cwd(), 'package.json'));
const name = process.env.NODE_SERVER_NAME || packageJson.name;

const port  = process.env.NODE_PORT || 3003;


app.listen(port, () => console.log(`${name} listening at http://localhost:${port}`))
