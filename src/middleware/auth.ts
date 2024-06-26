import crypto from 'node:crypto';
import argon2 from 'argon2';
import * as jose from 'jose';
import { privateKey, publicKey } from './load-key';

const authentication = {
    async hashPassword(password: string) {
        return argon2.hash(password, {
            type: argon2.argon2id,
            hashLength: 100,
            timeCost: 4,
        });
    },

    async verifyPassword(password: string, hash: string) {
        return argon2.verify(hash, password);
    },

    async createToken(payload: Record<string, unknown>) {
        payload.padding = crypto.randomBytes(48).toString('base64');
        return new jose.SignJWT(payload)
            .setProtectedHeader({alg: 'EdDSA'}) // Ed25519
            .setExpirationTime('12h')
            .setNotBefore('0.1s')
            .sign(privateKey);
    },

    async verifyToken(token: string) {
        try {
            const {payload, protectedHeader} = await jose.jwtVerify(token, publicKey, {
                algorithms: ['EdDSA'],
            });
            return payload;
        } catch (error) {
            console.log(error);
            return {
                error: 'invalid token',
            };
        }
    },
};

/*
Authentication.createToken({a: "b"}).then(async (result) => {
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    console.log(result);
await sleep(1000);
    Authentication.verifyToken(result).then((token) => {
        console.log(token);
    })
});
*/
export default authentication;
