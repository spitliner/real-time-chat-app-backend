import { type FastifyRequest } from 'fastify';

export type PostRequest = FastifyRequest<{
    Body: Record<string, unknown>;
}>;
