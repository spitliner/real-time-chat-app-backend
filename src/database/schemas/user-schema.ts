import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {type: String, required: true, index: {type: 1, unique: true}},
    email: {type: String, required: true, index: {type: 1, unique: true}},
    password: {type: String, required: true},
    username: {type: String, required: true, index: 'text'},
    friends: {type: String, required: true},
});

export default userSchema;
