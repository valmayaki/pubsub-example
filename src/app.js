const express = require('express');
const routes = require('./routes');
// const cors = require('cors');
const morgan = require('morgan');
const app = express();
// app.use(cors);

app.use(routes);
app.use(morgan('combined'));

module.exports = app