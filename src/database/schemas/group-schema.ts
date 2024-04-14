import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    id: {type: String, required: true, index: {type: 1, unique: true}},
    owners: {type: [String], required: true},
    name: {type: String, index: {type: 'text', sparse: true}},
    channels: {type: [String], required: true},
});

export default groupSchema;
