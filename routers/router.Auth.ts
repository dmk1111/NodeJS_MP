import { IUser } from "../bin/interfaces";
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import Passport from 'passport';
import { UsersController } from "../controllers";
import config from '../config';
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

const express = require('express');
const routerAuth = express.Router();
const userCtrl = new UsersController();

const secret: string = process.env.SECRET || config.secret;

routerAuth.post('/', (req, res) => {
    let users = userCtrl.getUsers();
    let username = req.body.username;
    let password = req.body.password;
    let user: IUser | undefined = userCtrl.getUser(username);
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
});

routerAuth.post("/passport/local", Passport.authenticate("local", { session: false }), (req, res) => {
    res.json({ id: req.user.id, token: `TOKEN-${req.user.id}` });
});

routerAuth.get("/passport/facebook", Passport.authenticate("facebook"));
routerAuth.get("/passport/facebook/callback", Passport.authenticate("facebook", { failureRedirect: "/error" }), (req, res) => {
    res.redirect("/");
});

routerAuth.get("/passport/twitter", Passport.authenticate("twitter"));
routerAuth.get("/passport/twitter/callback", Passport.authenticate("twitter", { failureRedirect: "/error" }), (req, res) => {
    res.redirect("/");
});

routerAuth.get("/passport/google", Passport.authenticate("google", { scope: ["profile"] }));
routerAuth.get("/passport/google/callback", Passport.authenticate("google", { failureRedirect: "/error" }), (req, res) => {
    res.redirect("/");
});

Passport.use("local", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
}, (username, password, done) => {
    let user = userCtrl.getUser(username);

    if (user) {
        compare(password, user.encryptedPass)
            .then(passed => {
                done(null, user);
            })
            .catch(_err => done(null, false, { message: "Invalid username or password."}));
    } else {
        done(null, false, { message: "Invalid username or password."});
    }
}));

Passport.use(new FacebookStrategy({
        clientID: "FACEBOOK_APP_ID",
        clientSecret: "FACEBOOK_APP_SECRET",
        callbackURL: "http://localhost:8080/auth/passport/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {

    }
));

Passport.use(new TwitterStrategy({
        consumerKey: "TWITTER_CONSUMER_KEY",
        consumerSecret: "TWITTER_CONSUMER_SECRET",
        callbackURL: "http://localhost:8080/auth/passport/twitter/callback"
    },
    (token, tokenSecret, profile, cb) => {

    }
));

Passport.use(new GoogleStrategy({
        clientID: "GOOGLE_CLIENT_ID",
        clientSecret: "GOOGLE_CLIENT_SECRET",
        callbackURL: "http://localhost:8080/auth/passport/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {

    }
));

export default routerAuth;