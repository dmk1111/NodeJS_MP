import http from 'http';

http
    .createServer()
    .on('request', (req, res) => {
        req.pipe(res)
    .on('error', (err) => console.log(err));
    }).listen(3000);