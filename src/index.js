
const { join } = require('path');

const app = require('./app');

const packageJson = require(join(process.cwd(), 'package.json'));

const port  = process.env.PORT || 3003;


app.listen(port, () => console.log(`${packageJson.name} listening at http://localhost:${port}`))
