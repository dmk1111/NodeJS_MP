import { verify } from 'jsonwebtoken';
import config from '../config';

// could be used at app level:
// app.use(path, [tokenVerifier, router]);
// or at router level:
// router.use(tokenVerifier);

export function tokenVerifier(req: any, res: any, next: any): void {
    const secret: string = process.env.SECRET || config.secret;

    let bearer: string = req.headers["x-access-token"] || req.headers['authorization'] || req.headers['Authorization'];
    let token = bearer ? bearer.split(' ')[1]: bearer;
    if (!token) {
        res.status(401).send({ auth: false, message: 'No token provided.' });
    } else {
        verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
            } else {
                next();
            }
        });
    }

}