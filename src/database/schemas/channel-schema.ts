import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    id: {type: String, required: true},
    groupId: {type: String, required: true},
    name: {type: String, required: true},
});

channelSchema.index({groupId: 1, id: 1}, {});

export default channelSchema;
