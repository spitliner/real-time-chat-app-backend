import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    id: {type: String, required: true, index: {type: 1, unique: true}},
    name: {type: String, required: true},
    channels: {type: [String], required: true},
});

export default groupSchema;
