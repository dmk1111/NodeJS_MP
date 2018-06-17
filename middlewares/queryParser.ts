const url = require('url');

export function queryParser(req: any, res: any, next: any) {
    let url_parts = url.parse(req.url, true);
    res.parsedQuery = url_parts.query;
    next();
}