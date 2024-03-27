import mongoose from 'mongoose';
import typia from 'typia';
import userSchema from '../schema/user-schema.js';
import { type Friends, type UserSettings } from '../../type/user-type.js';

const userMongoModel = mongoose.model('User', userSchema, 'UsersData');

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

    async getUserData(userId: string) {
        try {
            const query = userMongoModel.findOne({
                id: userId,
            }, 'id username password');

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
