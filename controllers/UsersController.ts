import { IUser } from "../bin/interfaces";
import { hash } from 'bcrypt';
import config from '../config';

export class UsersController {

    private users: IUser[] = require('../bin/data/Users');
    private salt = <any>process.env.SALT | config.secret;

    constructor() {
        this.addEncryptedPass();
    }

    public getUsers(): IUser[] {
        return this.users;
    }

    public getUser(username): IUser | undefined {
        return this.users.find(user => user.username === username);
    }

    private addEncryptedPass(): void {
        hash("1234", this.salt)
            .then(res => {
                this.users = this.users.map(user => {
                    user.encryptedPass = res;
                    return user;
                })
            })
            .catch(err => console.log('Error during generating passwords ', err));
    }


}