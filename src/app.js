const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(express.json()) // for parsing application/json
// app.use(express.urlencoded({ extended: true }))
app.use(routes);
app.use(morgan('combined'));
app.container = require('./container');

module.exports = app