const express = require('express');
const { cookieParser, queryParser } = require('./middlewares');
const { router, rootRouter } = require('./routes/router');

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(express.json());

app.use('/api', router);
app.use('/', rootRouter);

module.exports = app;