import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {type: String, required: true, index: {type: 1, unique: true}},
    username: {type: String, required: true, index: 'text'},
    email: {type: String, required: true, index: {type: 1, unique: true}},
    password: {type: String},
    openIdAuth: {type: String},
    otp: {type: String},
    oldPassword: {type: [String]},
    settings: {type: String, required: true},
    lastOnline: {type: Date},
    friends: {type: String},
});

export default userSchema;
