import fastifyFormbody from '@fastify/formbody';
import fastify from 'fastify';

const server = fastify();

await server.register(fastifyFormbody);

server.listen({ port: 8000 }, error => {
    if (error) {
        throw error;
    }
});
