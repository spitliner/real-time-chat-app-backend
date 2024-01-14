import { type IncomingMessageType } from '../type/message-type.js';
import { type SocketServerType, type SocketType } from '../type/socket-type.js';

const chatListener = (io: SocketServerType, socket: SocketType) => {
    socket.on('chatNew', (channelID: string, message: IncomingMessageType) => {
        console.log('channel: ' + channelID);
        console.log('content:\n' + String(message));
    });
};

export default chatListener;
