import { Model, Schema, model } from "mongoose";

const citySchema = new Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: String,
        long: String
    }
});
const CitySchema: Model<any> = model('City', citySchema);

export { CitySchema };