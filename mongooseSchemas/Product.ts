import { Model, Schema, model } from "mongoose";

const productSchema = new Schema({
    id: String,
    index: Number,
    isAvailable: Boolean,
    productName: String,
    price: String,
    picture: String,
    color: String,
    company: String,
    address: String,
    about: String,
    produced: Date,
    amount: Number,
    reviews: [
        {
            id: String,
            review: String,
            rating: Number
        }
    ]
});
const ProductSchema: Model<any> = model('Product', productSchema);

export { ProductSchema };