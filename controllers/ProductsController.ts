import { IProduct } from "../bin/interfaces";

export class ProductsController {

    private products: IProduct[] = require('../bin/data/Products');

    constructor() {

    }

    getProducts(): IProduct[] {
        return this.products;
    }
}