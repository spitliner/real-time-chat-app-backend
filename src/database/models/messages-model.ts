import mongoose from 'mongoose';
import Snowflake from 'snowflake-id';
import messageSchema from '../schemas/message-schema';

const messageMongoModel = mongoose.model('Message', messageSchema, 'Messages');

const messageModel = {
    async newMessage(userId: string, channelId: string, content: string) {
        try {
            const result = await messageMongoModel.create({
                id: Snowflake.generate(),
                userId,
                channelId,
                content,
            });

            return {
                result,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async getMessage(id: string) {
        try {
            const query = messageMongoModel.findOne({
                id,
            }, '-_id -__v');

            const result = await query.lean().exec();

            if (null === result) {
                return {
                    error: 'message not found',
                };
            }

            return {
                result,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async getChannelMessage(cid: string) {
        try {
            const query = messageMongoModel.find({
                channelId: cid,
            }, '-_id -__v');

            const result = await query.lean().exec();

            return {
                result,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
};

export default messageModel;
