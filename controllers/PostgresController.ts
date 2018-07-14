import SequelizeConstructor from 'sequelize';
import { Sequelize } from 'sequelize';
import { Importer } from '../bin/modules';
import * as Path from 'path';
import { IProduct } from "../bin/interfaces";

export class PostgresController {

    private sequelize: Sequelize;
    private path: string = Path.resolve('./bin/data/Products.csv');
    private product;

    constructor(private connectionOptions) {
        this.sequelize = new SequelizeConstructor(connectionOptions);
        this.product = this.sequelize.import('../models/product.js');
        this.testConnection();
    }

    public importProductData(path) {
        const importer = new Importer();
        importer.import(path).then((result: string) => {
            let data = JSON.parse(result);
            this.sequelize.sync({ force: true })
                .then(() => {
                    for (let key in data) {
                        const newProduct = {
                            index: +data[key].index,
                            isAvailable: !!data[key].isAvailable,
                            productName: data[key].productName,
                            price: data[key].price,
                            picture: data[key].picture,
                            color: data[key].color,
                            company: data[key].company,
                            address: data[key].address,
                            about: data[key].about,
                            produced: new Date(data[key].produced),
                            amount: +data[key].amount
                        };
                        this.product
                            .create(newProduct)
                            .then(function (product) {
                                console.log(product.get({
                                    plain: true
                                }));
                            }, function (error) {
                                console.log('ERROR!!!! ', error);
                            })
                    }
                })
                .then(() => console.log(`Products were imported from path '${this.path}'`));
        })

    }

    public async getProducts(): Promise<IProduct[]> {
        return await this.product.findAll();
    }

    public async getProduct(id: string): Promise<IProduct> {
        return await this.product.findOne({where: {id: +id}});
    }

    private testConnection() {
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection to Postgres DB has been established successfully.');
                // this.importProductData(this.path);
            })
            .catch(err => {
                console.error('Unable to connect to the Postgres database:', err);
            });
    }

}