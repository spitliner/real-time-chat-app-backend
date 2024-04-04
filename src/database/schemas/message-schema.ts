import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    id: {type: String, required: true, index: {type: 1, unique: true}},
    uid: {type: String, required: true},
    cid: {type: String, required: true},
    content: {type: String, index: 'text'},
});

export default messageSchema;
