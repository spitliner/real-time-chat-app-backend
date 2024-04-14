import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    id: {type: String, required: true},
    userId: {type: String, required: true},
    groupId: {type: String, required: true},
    channelId: {type: String, required: true},
    content: {type: String, index: 'text'},
});

messageSchema.index({id: 1, groupId: 1, channelId: 1}, {unique: true});
messageSchema.index({groupId: 1, channelId: 1});

export default messageSchema;
