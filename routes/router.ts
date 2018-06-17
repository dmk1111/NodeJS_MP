import { IProduct } from "../bin/interfaces/Product";
import { IUser } from "../bin/interfaces/User";

const express = require('express');
const router = express.Router();
const rootRouter = express.Router();
const users: IUser[] = require('../bin/data/Users');
const products: IProduct[] = require('../bin/data/Products');
// const { User, Product } = require('../models');

rootRouter.get('/', (req, res) => {
    res.send('Public api is available at "/api" route');
    res.end();
});

router.get('/', (req, res) => {
    res.json([
        {
            method: 'GET',
            route: '/products',
            description: 'return ALL products'
        },
        {
            method: 'GET',
            route: '/products/:id',
            description: 'return SINGLE product'
        },
        {
            method: 'GET',
            route: '/products/:id/reviews',
            description: 'return ALL reviews for a single product'
        },
        {
            method: 'POST',
            route: '/products',
            description: 'add NEW product and return it'
        },
        {
            method: 'GET',
            route: '/users',
            description: 'return ALL users'
        }
    ]);
});

router.get('/users', (req, res) => {
    // let parsedUsers = users.map(item => new User(item));
    // res.json(parsedUsers);
    res.json(users);
});

router.get('/products', (req, res) => {
    // let mappedProducts = products.map(item => new Product(item));
    // res.json(mappedProducts);
    res.json(products);
});

router.get('/products/:id', (req, res) => {
    let singleProduct = getSingleProduct(req.params.id);
    res.json(singleProduct);
});

router.param('id', function (req, res, next, id) {
    // noinspection JSAnnotator
    req.product = getSingleProduct(id);
    next();
});

router.get('/products/:id/reviews', (req, res) => {
    res.json(req.product.reviews);
});

router.post('/products', (req, res) => {
    products.push(req.body.product);
    res.statusCode(200);
});

module.exports = {
    router: router,
    rootRouter: rootRouter
};

function getSingleProduct(id: string): IProduct {
    return products.filter(item => item._id === id)[0];
}

export { router, rootRouter };