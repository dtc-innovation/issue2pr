'use strict';

const fastify = require('fastify')()

const PORT = process.env.PORT || 5000

fastify.get('/webhook/issue-to-pr', (request, reply) => {
    reply.send({ hello: 'world' })
})

fastify.listen(PORT, '0.0.0.0', function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})