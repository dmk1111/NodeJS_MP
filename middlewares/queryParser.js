const url = require('url');

function queryParser(req, res, next) {
    let url_parts = url.parse(req.url, true);
    res.parsedQuery = url_parts.query;
    next();
}

module.exports = queryParser;