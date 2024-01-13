import mongoose from 'mongoose';
const openIdSchema = new mongoose.Schema({
    provider: { type: String, required: true },
    token: { type: String, required: true },
});
const userSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: 1, unique: true } },
    username: { type: String, required: true, index: 'text' },
    password: { type: String },
    openIdAuth: { type: openIdSchema },
    email: { type: String, required: true, index: { type: 1, unique: true } },
    settings: { type: String, required: true },
    lastOnline: { type: Date },
    friends: { type: String },
});
export default userSchema;
