import express from 'express';
import typia from 'typia';
import {isString} from '../middleware/typia-type.js';

const authRouter = express.Router(); // eslint-disable-line new-cap

authRouter.post('/login', async (request, response) => {
    try {
        const email: unknown = request.body.email;
        const password: unknown = request.body.password;

        if (!isString(email) || !isString(password)) {
            return response.status(400).json({error: 'missing login information'});
        }

        return response.status(200).json({token: email + password, type: 'jwt', uid: '123'});
    } catch (error) {
        console.log(error);
        return response.status(500).json({error: 'unexpected server error'});
    }
});

export default authRouter;
