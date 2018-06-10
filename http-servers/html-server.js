const http = require('http');
const fs = require('fs');
// const { StringDecoder } = require('string_decoder');

// const decoder = new StringDecoder('utf8');

http
    .createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        // let html = decoder.write(fs.readFileSync('index.html'));
        // html = html.replace(/\{message\}/gmi, 'server is working on port 3000');
        // res.write(html);

        let rstream = fs.createReadStream('index.html');

        rstream.setEncoding('utf-8');
        rstream.on('data', chunk => {
            if (/\{message\}/gmi.test(chunk.toString())) {
                chunk = chunk.toString().replace(/\{message\}/gmi, 'server is working on port 3000')
            }
            res.write(chunk.toString());
        });
        rstream.on('end', _ => {
            res.end();
        });
    }).listen(3000);