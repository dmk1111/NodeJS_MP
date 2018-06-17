import { IProduct, IUser } from "../bin/interfaces";
import { ProductsController, UsersController } from "../controllers";

const express = require('express');
const routerApi = express.Router();
const users: IUser[] = new UsersController().getUsers();
const products: IProduct[] = new ProductsController().getProducts();

routerApi.get('/', (req, res) => {
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

routerApi.get('/users', (req, res) => {
    // let parsedUsers = users.map(item => new User(item));
    // res.json(parsedUsers);
    res.json(users);
});

routerApi.get('/products', (req, res) => {
    // let mappedProducts = products.map(item => new Product(item));
    // res.json(mappedProducts);
    res.json(products);
});

routerApi.get('/products/:id', (req, res) => {
    let singleProduct = getSingleProduct(req.params.id);
    res.json(singleProduct);
});

routerApi.param('id', function (req, res, next, id) {
    // noinspection JSAnnotator
    req.product = getSingleProduct(id);
    next();
});

routerApi.get('/products/:id/reviews', (req, res) => {
    res.json(req.product.reviews);
});

routerApi.post('/products', (req, res) => {
    products.push(req.body.product);
    res.statusCode(200);
});

function getSingleProduct(id: string): IProduct {
    return products.filter(item => item._id === id)[0];
}

export default routerApi;