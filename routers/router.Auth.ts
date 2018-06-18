import { IUser } from "../bin/interfaces";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UsersController } from "../controllers";
import config from '../config';

const express = require('express');
const routerAuth = express.Router();
const userCtrl = new UsersController();

const secret: string = process.env.SECRET || config.secret;

routerAuth.post('/', (req, res) => {
    let users = userCtrl.getUsers();
    let username = req.body.username;
    let password = req.body.password;
    let user: IUser | undefined = users.find(user => user.username === username);
    if (user) {
        compare(password, user.encryptedPass)
            .then(passed => {
                let token = sign({ user: username }, secret, { expiresIn: '1h' });
                let success = {
                    "code": 200,
                    "message": "OK",
                    "data": {
                        "user": user
                    },
                    "token": token
                };
                res.send(success);
            })
            .catch(err => res.sendStatus(401));
    } else {
        let fail = {
            "code": 404,
            "message": "Not Found",
            "data": { "additionalData": "Some more data" }
        };
        res.send(fail);
    }
    // res.end();
});

export default routerAuth;