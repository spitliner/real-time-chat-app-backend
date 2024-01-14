import process from 'node:process';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import authRouter from './auth-router';

dotenv.config();

//------

const expressServer = express();
expressServer.use(cors({
    origin: [
        `http://localhost:${process.env.AUTH_SERVER_PORT}`,
        `http://localhost:${process.env.SOCKET_SERVER_PORT}`,
    ],
    credentials: true,
}));
expressServer.use(express.json());
expressServer.use(express.urlencoded({extended: true}));

//------

expressServer.use('/api', authRouter);
expressServer.get('*', (request, response) => response.status(404).json({error: 'unknown request'}));

export default expressServer;
