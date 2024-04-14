import { type FastifyInstance } from 'fastify';
import { type PostRequest } from '../typing/fastify-typing';

async function authRouter(fastify: FastifyInstance, option: Record<string, unknown>) {
    fastify.post('/', async (request: PostRequest, reponse) => {
        const email: unknown = request.body.email;
        const password: unknown = request.body.email;
        return reponse.code(200).send({hello: 'world'});
    });

    fastify.post('/email/duplicate', async (request: PostRequest, reponse) => {
        const email: unknown = request.body.email;
        return reponse.code(200).send({hello: 'world'});
    });

    fastify.post('/password/strength', async (request: PostRequest, reponse) => {
        const password: unknown = request.body.email;
        return reponse.code(200).send({hello: 'world'});
    });
}

export default authRouter;
