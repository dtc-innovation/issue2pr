import _fastify from 'fastify'
import turnIssueIntoPr from './turn-issue-into-pr'

const PORT = process.env.PORT || 5000

const fastify = _fastify();

fastify.post('/webhook/issue-to-pr', (request, reply) => {
    console.log('request', request);
    reply.send({ hello: 'world' })
})

fastify.listen(PORT, '0.0.0.0', function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
