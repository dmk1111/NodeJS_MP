import { IProduct, IUser } from "../bin/interfaces";
import { PostgresController, ProductsController, UsersController } from "../controllers";
import { tokenVerifier } from "../middlewares";
// import { MongoClient } from "mongodb";
import { connect as mongooseConnect, connection as mongooseDb } from 'mongoose';
import { CitySchema /* , UserSchema, ProductSchema */ } from "../mongooseSchemas";

process.env.NODE_ENV = 'test';
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

const postgresCtrl = new PostgresController(config);


// Connection url mongo
const url = 'mongodb://mongodb1:mongodb1@ds131711.mlab.com:31711/node_mentoring';
// Connect using mongoose
mongooseConnect(url)
    .then(_ => console.log('Connected to MongoDB'))
    .catch(err => console.error(`Error connecting to MongoDB: ${err}`));

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


mongooseDb.once('open', () => {

    routerApi.get('/cities/random', (req, res) => {

// // Connect using MongoClient
//     MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
//         if (err) {console.error(err); }
//         const col = client.db().collection('cities');
//         // Show that duplicate records got dropped
//         col.find({}).toArray(function(err, items) {
//             const randomItem = items[Math.floor(Math.random()*items.length)];
//             res.json(randomItem);
//             client.close();
//         });
//     });

        // get random city using mongoose
        CitySchema.find({})
            .exec()
            .then(cities => {
                const randomItem = cities[Math.floor(Math.random() * cities.length)];
                res.json(randomItem);
            })
            .catch(err => res.sendStatus(500).send(err));
    });

    // Used this route once to add data to mongoDB from json file
    /*
    routerApi.post('/mongodb/update-collections', (req, res) => {
        const users = require('../bin/data/Users');
        const products = require('../bin/data/Products');
        UserSchema.collection.insertMany(users)
            .then(usersResult => {
                ProductSchema.collection.insertMany(products)
                    .then(productsResult => {
                        res.json([usersResult, productsResult]);
                    })
            })
            .catch(err => res.send(err));
    })
    */

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