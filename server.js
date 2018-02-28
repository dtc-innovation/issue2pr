import _fastify from 'fastify'
import turnIssueIntoPr from './turn-issue-into-pr'

const PORT = process.env.PORT || 5000

const fastify = _fastify();

fastify.post('/webhook/issue-to-pr', (request, reply) => {
    // reply right away
    reply.send('')
    
    console.log('request', request);

    const {headers, body} = request;
    const eventType = headers['x-github-event'];
    const refType = body.ref_type;

    if(eventType !== 'create' || refType !== 'branch')
        return;

    // we're creating a branch
    const ref = body.ref
    console.log('ref', ref);

    const owner = body.repository.owner.login;
    const repo = body.repository.name;

    console.log(owner, repo)
})

fastify.listen(PORT, '0.0.0.0', function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
