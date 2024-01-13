import mongoose from 'mongoose';
import {Snowflake} from 'snowflake';
import messageSchema from '../schema/message-schema.js';

const messageMongoModel = mongoose.model('Message', messageSchema, 'Messages');

async function getMessageMongo(messageId: string, messageChannel: string, readOnly?: boolean) {
    const query = messageMongoModel.findOne({
        id: messageId,
        channelId: messageChannel,
    });
    if (readOnly) {
        return query.lean().exec();
    }

    return query.exec();
}

const messageModel = {
    async getMessage(messageId: string, messageChannel: string) {
        return messageMongoModel.findOne({
            id: messageId,
            channelId: messageChannel,
        }, '-_id -__v').lean().exec();
    },

    async createMessage(newMessage: {
        channelId: string;
        userId: string;
        mention: string[];
        mentionRole: string[];
        attachment: string[];
        content: string;
        format: string[];
    }) {
        try {
            const result = await messageMongoModel.create({
                id: Snowflake.generate(),
                channelId: newMessage.channelId,
                userId: newMessage.userId,
                mention: newMessage.mention,
                mentionRole: newMessage.mentionRole,
                attachment: newMessage.attachment,
                content: newMessage.content,
                format: newMessage.format,
                createdAt: new Date(),
            });

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

    async editedMessage(messageId: string, messageChannel: string, messageAuthor: string, editedContent: {
        content: string;
        format: string[];
        mention: string[];
        mentionRole: string[];
        attachment: string[];
    }) {
        try {
            const message = await getMessageMongo(messageId, messageChannel, true);
            if (null === message) {
                return {
                    error: 'message not found',
                };
            }

            if (messageAuthor !== message.userId) {
                return {
                    error: 'user is not author of message',
                };
            }

            if (editedContent.attachment !== message.attachment
                || editedContent.content !== message.content
                || editedContent.format !== message.format
                || editedContent.mention !== message.mention
                || editedContent.mentionRole !== message.mentionRole) {
                const result = await messageMongoModel.findOneAndUpdate({
                    id: messageId,
                    channelId: messageChannel,
                }, {
                    attachment: editedContent.attachment,
                    content: message.content,
                    format: message.format,
                    mention: message.mention,
                    mentionRole: message.mentionRole,
                    lastEdited: new Date(),
                }).lean().exec();

                if (null === result) {
                    return {
                        error: '',
                    };
                }

                if (editedContent.attachment === result.attachment
                    && editedContent.content === result.content
                    && editedContent.format === result.format
                    && editedContent.mention === result.mention
                    && editedContent.mentionRole === result.mentionRole) {
                    return {
                        result: 'message edited',
                    };
                }

                return {
                    error: 'message failed to be edit',
                };
            }

            return {
                result: 'message unmodified',
            };
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async deleteMessage(messageId: string, messageChannel: string) {
        try {
            return await messageMongoModel.deleteOne({
                id: messageId,
                channelId: messageChannel,
            }).lean().exec();
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },

    async deleteMessageMany(messageAuthor: string, messageChannel: string[]) {
        try {
            return await messageMongoModel.deleteOne({
                channelId: messageChannel,
                userId: messageAuthor,
            }).lean().exec();
        } catch (error) {
            console.log(error);
            return {
                error: 'database error',
            };
        }
    },
};

export default messageModel;
