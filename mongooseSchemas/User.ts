import { Model, Schema, model } from "mongoose";

const userSchema = new Schema({
    id: String,
    index: Number,
    guid: String,
    isActive: Boolean,
    balance: String,
    picture: String,
    age: Number,
    eyeColor: String,
    firstName: String,
    lastName: String,
    username: String,
    company: String,
    email: String,
    phone: String,
    address: String,
    about: String,
    registered: String,
    latitude: String,
    longitude: String,
    tags: [String],
    range: [Number],
    friends: [
        {
            id: Number,
            name: String
        }
    ],
    greeting: String,
    favoriteFruit: String
});
const UserSchema: Model<any> = model('User', userSchema);

export { UserSchema };