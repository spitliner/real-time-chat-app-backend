import mongoose from 'mongoose';
const groupSchema = new mongoose.Schema({
    id: { type: String, required: true, index: { type: 1, unique: true } },
    name: { type: String, required: true, index: 'text' },
    public: { type: Boolean, required: true },
    invite: { type: String, index: { type: 1, unique: true, sparse: true } },
});
export default groupSchema;
