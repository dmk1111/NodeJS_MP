import { IProduct, IUser } from "../bin/interfaces";
import { PostgresController, ProductsController, UsersController } from "../controllers";
import { tokenVerifier } from "../middlewares";

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const postgresCtrl = new PostgresController(config);

const express = require('express');
const routerApi = express.Router();
const users: IUser[] = new UsersController().getUsers();
const productCtrl = new ProductsController();
const products: IProduct[] = productCtrl.getProducts();

routerApi.use(tokenVerifier);

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

routerApi.get('/products', async (req, res) => {
    // let mappedProducts = products.map(item => new Product(item));
    // res.json(mappedProducts);
    // res.json(products);
    const data = await postgresCtrl.getProducts();
    res.json(data);
});

routerApi.get('/products/:id', async (req, res) => {
    let singleProduct = await getSingleProduct(req.params.id);
    res.json(singleProduct);
});

routerApi.param('id', async function (req, res, next, id) {
    // noinspection JSAnnotator
    req.product = await getSingleProduct(id);
    next();
});

routerApi.get('/products/:id/reviews', (req, res) => {
    res.json(req.product.reviews);
});

routerApi.post('/products', (req, res) => {
    products.push(req.body.product);
    res.statusCode(200);
});

async function getSingleProduct(id: string): Promise<IProduct> {
    // return products.filter(item => item.id === id)[0];
    return await postgresCtrl.getProduct(id);
}

export default routerApi;