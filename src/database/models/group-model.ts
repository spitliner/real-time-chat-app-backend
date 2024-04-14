import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import groupSchema from '../schemas/group-schema';

const groupMongoModel = mongoose.model('Group', groupSchema, 'Groups');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGenerate = customAlphabet(alphabet, 12);

const groupModel = {
    async createGroup(name: string, admin: string) {
        try {
            const result = await groupMongoModel.create({
                id: uidGenerate,
                name,
            });
        } catch (error) {
            console.log(error);
        }
    },

    async getGroup(id: string) {
        try {
            const query = groupMongoModel.findOne({
                id,
            });

            const result = await query.lean().exec();

            if (null === result) {
                return {
                    error: 'Group not found',
                };
            }
        } catch (error) {
            console.log(error);
            return {
                error: 'Database error',
            };
        }
    },

    async addChannel(id: string, channelId: string) {
        try {
            const query = groupMongoModel.findByIdAndUpdate({
                id,
            }, {
                $push: {channels: channelId},
            }, {
                new: true,
            });

            const result = await query.lean().exec();

            if (null === result) {
                return {
                    error: 'Group not found',
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
};

export default groupModel;
