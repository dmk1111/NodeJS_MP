const express = require('express');
const routerRoot = express.Router();

routerRoot.get('/', (req, res) => {
    res.send('Public api is available at "/api" route');
    res.end();
});

export default routerRoot;