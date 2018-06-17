import { verify } from 'jsonwebtoken';
import config from '../config';

export function tokenVerifier(req: any, res: any, next: any) {
    const secret: string = process.env.SECRET || config.secret;

    let token = req.headers["x-access-token"];

    if (req.parsedQuery.path === '/auth') {
        next();
    } else {
        if (!token) {
            res.status(401).send({ auth: false, message: 'No token provided.' });
        } else {
            verify(token, secret, (err, decoded) => {
                if (err) {
                    res.status(404).json({ auth: false, message: 'Failed to authenticate token.' });
                } else {
                    next();
                }
            });
        }
    }

}