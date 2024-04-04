import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import userSchema from '../schemas/user-schema';

const userMongoModel = mongoose.model('User', userSchema, 'Users');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGenerate = customAlphabet(alphabet, 12);

const numeric = '0123456789';
const otpGenerate = customAlphabet(numeric, 6);

const userModel = {
    async createUser(email: string, password: string, username: string) {
        try {
            const result = await userMongoModel.create({
                id: uidGenerate(),
                email,
                password,
                username,
            });
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async checkId(id: string) {
        const query = userMongoModel.countDocuments({
            id,
        });

        return query.lean().exec();
    },

    async getUserByEmail(email: string) {
        try {
            const query = userMongoModel.findOne({
                email,
            }, '-_id -__v');

            const result = await query.lean().exec();

            if (null === result) {
                return {
                    error: 'user not found',
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

    async getUserById(id: string) {
        try {
            const query = userMongoModel.findOne({
                id,
            }, '-_id -__v');

            const result = await query.lean().exec();

            if (null === result) {
                return {
                    error: 'user not found',
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
};

export default userModel;
