import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import channelSchema from '../schemas/channel-schema';

const channelMongoModel = mongoose.model('Group', channelSchema, 'Groups');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGenerate = customAlphabet(alphabet, 6);

const channelModel = {
    async createChannel(name: string, groupId: string) {
        try {
            const result = await channelMongoModel.create({
                id: uidGenerate,
                name,
                groupId,
            });
        } catch (error) {
            console.log(error);
        }
    },

    async getChannel(id: string, groupId: string) {
        try {
            const query = channelMongoModel.findOne({
                id,
                groupId,
            });

            const result = await query.lean().exec();

            if (null === result) {
                return {
                    error: 'Channel not found',
                };
            }

            return {
                result,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },

    async removeChannel(id: string, groupId: string) {
        try {
            const query = channelMongoModel.deleteOne({
                id,
                groupId,
            });

            const result = await query.lean().exec();

            if (0 === result.deletedCount) {
                return {
                    error: 'Channel not found',
                };
            }

            return {
                result: true,
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },
};

export default channelModel;
