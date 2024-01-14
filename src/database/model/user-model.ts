import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import typia from 'typia';
import userSchema from '../schema/user-schema.js';
import { type Friends, type UserSettings } from '../../type/user-type.js';

const userMongoModel = mongoose.model('User', userSchema, 'Users');

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 12);

async function getUserMongo(userId: string, readOnly?: boolean) {
    const query = userMongoModel.findOne({
        id: userId,
    });
    if (readOnly) {
        return query.lean().exec();
    }

    return query.exec();
}

const defaultUserSetting: UserSettings = {
    theme: 'default',
};

const userModel = {
    async createUser(email: string, username: string, password: string) {
        try {
            const settings: UserSettings = defaultUserSetting;
            const result = await userMongoModel.create({
                id: uidGen(),
                username,
                password,
                email,
                settings: typia.json.stringify<UserSettings>(settings),
            });

            console.log('Insert new user with id ' + String(result.id));
            return {
                result: String(result.id),
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async getUserByEmail(userEmail: string) {
        try {
            const query = userMongoModel.findOne({
                email: userEmail,
            }, '-_id -__v');

            return {
                result: await query.lean().exec(),
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async getUser(userId: string) {
        try {
            const query = userMongoModel.findOne({
                id: userId,
            }, '-_id -__v');

            return {
                result: await query.lean().exec(),
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async getUserPublicProfile(userId: string) {
        try {
            return {
                result: await userMongoModel.findOne({
                    id: userId,
                }, 'id username lastOnline').lean().exec(),
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async checkId(userId: string) {
        return 0 === await userMongoModel.countDocuments({
            id: userId,
        }).lean().exec();
    },

    async checkEmail(email: string) {
        return 0 === await userMongoModel.countDocuments({
            email,
        }).lean().exec();
    },

    async searchUserByUsername(searchString: string) {
        try {
            return {
                result: await userMongoModel.find({
                    $text: {
                        $search: searchString,
                    },
                }, 'id username lastOnline').lean().exec(),
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async modifiedUserFriend(userId: string, friendList: Friends) {
        try {
            await userMongoModel.findOneAndUpdate({
                id: userId,
            }, {
                friends: typia.json.stringify<Friends>(friendList),
            });
        } catch (error) {
            console.log(error);
        }
    },
};

export default userModel;
