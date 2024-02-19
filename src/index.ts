import process from 'node:process';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import uWebSocketsApp from './socket/socket';
import expressServer from './router/express-setup';

dotenv.config();

mongoose.connection.on('open', () => {
    console.log('Connected to mongo server.');
});

mongoose.connection.on('error', error => {
    console.log('Could not connect to mongo server!');
    console.log(error);
});

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dev0.agidxfk.mongodb.net/?retryWrites=true&w=majority`;

void mongoose.connect(uri, {dbName: process.env.DB_NAME});

//------

const portNumber: number = (Number(process.env.AUTH_SERVER_PORT) || 3000);

expressServer.listen(portNumber, () => {
    console.log('Server started on port ' + portNumber);
});

//------

uWebSocketsApp.listen(4000, token => {
    if (!token) {
        console.warn('port already in use');
    }
});
