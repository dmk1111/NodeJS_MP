import http from 'http';

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
};


http
    .createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.write(JSON.stringify(product));
        res.end();
    })
    .on('error', (err) => console.log(err))
    .listen(3000);