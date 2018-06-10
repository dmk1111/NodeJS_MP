/*
TODO: create routes for:
    /api/products	GET	Return ALL products
    /api/products/:id	GET	Return SINGLE product
    /api/products/:id/reviews	GET	Return ALL reviews for a single product
    /api/products	POST	Add NEW product and return it
    /api/users	GET	Return ALL users
*/

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
res.json({'ok': true});
});

module.exports = router;