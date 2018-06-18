const express = require('express');
import { cookieParser, queryParser, tokenVerifier } from './middlewares';
import { routerApi, routerRoot, routerAuth } from './routers';

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routerAuth);
app.use('/api', routerApi);
app.use('/', [tokenVerifier, routerRoot]);

// module.exports = app;

export default app;