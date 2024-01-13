import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    id: {type: String, required: true},
    channelId: {type: String, required: true},
    userId: {type: String, required: true},
    createdAt: {type: Date, required: true},
    lastEdited: {type: Date},
    reply: {type: String},
    content: {type: String, index: {type: 'text', sparse: true}},
    mention: {type: [String], required: true},
    mentionRole: {type: [String], required: true},
    attachment: {type: [String], required: true},
    format: {type: [String], required: true},
});

messageSchema.index({id: 1, channelId: 1}, {unique: true});
messageSchema.index({id: 1});
messageSchema.index({channelId: 1, userId: 1});

export default messageSchema;
