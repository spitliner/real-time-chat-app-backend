import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import typia from 'typia';
import userSchema from '../schema/user-schema.js';
const userMongoModel = mongoose.model('User', userSchema, 'Users');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const uidGen = customAlphabet(alphabet, 12);
async function getUserMongo(userId, readOnly) {
    const query = userMongoModel.findOne({
        id: userId,
    });
    if (readOnly) {
        return query.lean().exec();
    }
    return query.exec();
}
const defaultUserSetting = {
    theme: 'default',
};
const userModel = {
    async createUser(email, username, password) {
        try {
            const settings = defaultUserSetting;
            const result = await userMongoModel.create({
                id: uidGen(),
                username,
                password,
                email,
                settings: (input => {
                    const $string = typia.json.stringify.string;
                    return `{"theme":${$string(input.theme)}}`;
                })(settings),
            });
            console.log('Insert new user with id ' + String(result.id));
            return {
                result: String(result.id),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async getUserByEmail(userEmail) {
        try {
            const query = userMongoModel.findOne({
                email: userEmail,
            }, '-_id -__v');
            return {
                result: await query.lean().exec(),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async getUser(userId) {
        try {
            const query = userMongoModel.findOne({
                id: userId,
            }, '-_id -__v');
            return {
                result: await query.lean().exec(),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async getUserPublicProfile(userId) {
        try {
            return {
                result: await userMongoModel.findOne({
                    id: userId,
                }, 'id username lastOnline').lean().exec(),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async checkId(userId) {
        return 0 === await userMongoModel.countDocuments({
            id: userId,
        }).lean().exec();
    },
    async checkEmail(email) {
        return 0 === await userMongoModel.countDocuments({
            email,
        }).lean().exec();
    },
    async searchUserByUsername(searchString) {
        try {
            return {
                result: await userMongoModel.find({
                    $text: {
                        $search: searchString,
                    },
                }, 'id username lastOnline').lean().exec(),
            };
        }
        catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
    async modifiedUserFriend(userId, friendList) {
        try {
            await userMongoModel.findOneAndUpdate({
                id: userId,
            }, {
                friends: (input => {
                    const $io1 = input => true && "string" === typeof input.channel;
                    const $string = typia.json.stringify.string;
                    const $so0 = input => `{${Object.entries(input).map(([key, value]) => { if (undefined === value)
                        return ""; return `${JSON.stringify(key)}:${$so1(value)}`; }).filter(str => "" !== str).join(",")}}`;
                    const $so1 = input => `{"lastVisit":${$string(input.lastVisit.toJSON())},"channel":${$string(input.channel)}}`;
                    return $so0(input);
                })(friendList),
            });
        }
        catch (error) {
            console.log(error);
        }
    },
};
export default userModel;
