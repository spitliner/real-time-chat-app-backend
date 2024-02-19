import { isIncomingEditedMessage, isIncomingMessage, isString, stringifyContent, stringifyEditedContent } from '../middleware/typia-middleware.js';
import { type SocketServerType, type SocketType } from '../type/socket-type.js';

const chatListener = (io: SocketServerType, socket: SocketType) => {
    socket.on('chatNew', (channelID: unknown, message: unknown) => {
        if (isString(channelID) && isIncomingMessage(message)) {
            console.log('channel: ' + channelID);
            console.log('content:\n' + stringifyContent(message));
        }
    });

    socket.on('chatEdit', (channelID: unknown, messageID: unknown, editedContent: unknown) => {
        if (isString(channelID) && isString(messageID) && isIncomingEditedMessage(editedContent)) {
            console.log('channel: ' + channelID);
            console.log('edit content:\n' + stringifyEditedContent(editedContent));
        }
    });

    socket.on('chatTyping', (channelID: unknown) => {
        if (isString(channelID)) {
            console.log('channel: ' + channelID);
        }
    });
};

export default chatListener;
