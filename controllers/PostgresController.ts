import SequelizeConstructor from 'sequelize';
import { Sequelize } from 'sequelize';
import { Importer } from '../bin/modules';
import Product from '../models/product.js'

export class PostgresController {

    private sequelize: Sequelize;
    private path: string = '../bin/data/Products.csv';
    private product = Product();

    constructor(private connectionOptions) {
        this.sequelize = new SequelizeConstructor(connectionOptions);
        this.testConnection();
    }

    public importProductData(path) {
        let importer = new Importer();
        importer.import(path).then((result: string) => {
            let data = JSON.parse(result);
            this.sequelize.sync()
                .then(() => {
                    for( let key in data ) {
                        this.product
                            .findOrCreate({where: {id: data[key].id}, defaults: {
                                    index: data[key].index,
                                    isAvailable: data[key].isAvailable,
                                    productName: data[key].productName,
                                    price: data[key].price,
                                    picture: data[key].picture,
                                    color: data[key].color,
                                    company: data[key].company,
                                    address: data[key].address,
                                    about: data[key].about,
                                    produced: data[key].produced,
                                    amount: data[key].amount
                                }})
                            .spread(function(product, created) {
                                console.log(product.get({
                                    plain: true
                                }));
                                console.log(created)
                            })
                    }
                })
                .then( () => console.log(`Products were imported from path '${this.path}'`));
        })

    }

    private testConnection() {
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                this.importProductData(this.path);
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

}