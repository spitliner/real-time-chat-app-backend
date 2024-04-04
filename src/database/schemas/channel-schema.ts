import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    id: {type: String, required: true, index: {type: 1, unique: true}},
    groupId: {type: String, required: true},
    name: {type: String, required: true},
});

export default channelSchema;
