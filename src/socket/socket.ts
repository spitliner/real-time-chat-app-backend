/* eslint-disable new-cap */
import * as socketIO from 'socket.io';
import * as uWebSockets from 'uWebSockets.js';
import { type SocketType } from '../type/socket-type';
import chatListener from './socket-chat';
import { type ClientToServerEvents, type ServerToClientEvents, type InterServerEvents, type SocketData } from './socket-interface';

const uWebSocketsApp = uWebSockets.App();
const io = new socketIO.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

io.attachApp(uWebSocketsApp);

const onConnection = (socket: SocketType) => {
    chatListener(io, socket);
};

io.on('connection', onConnection);

export default uWebSocketsApp;
