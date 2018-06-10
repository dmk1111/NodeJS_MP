const express = require('express');
const { cookieParser, queryParser } = require('./middlewares');
const router = require('./routes/router');

const app = express();

app.use(cookieParser);
app.use(queryParser);

app.use('/api', router);
app.use('/', router);

module.exports = app;