const express = require('express');
import { cookieParser, queryParser, tokenVerifier } from './middlewares';
import { routerApi, routerRoot, routerAuth } from './routers';

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(tokenVerifier);
app.use(express.json());

app.use('/auth', routerAuth);
app.use('/api', routerApi);
app.use('/', routerRoot);

// module.exports = app;

export default app;