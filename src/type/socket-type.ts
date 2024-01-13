import type * as socketIO from 'socket.io';
import { type ClientToServerEvents, type InterServerEvents, type ServerToClientEvents, type SocketData } from '../socket/socket-interface.js';

export type SocketType = socketIO.Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export type SocketServerType = socketIO.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
