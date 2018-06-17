const express = require('express');
import { cookieParser, queryParser } from './middlewares';
import { router, rootRouter } from './routes/router';

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(express.json());

app.use('/api', router);
app.use('/', rootRouter);

// module.exports = app;

export default app;