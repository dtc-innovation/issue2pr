import _fastify from 'fastify'
import turnIssueIntoPr from './turn-issue-into-pr'

const PORT = process.env.PORT || 5000

const fastify = _fastify();

// this function defines a convention for branches to be turned into PR on push
// it returns a falsy value when the branch doesn't match
// For now, let's say branch name 'issue-XXX' targets the XXX issue
const PREFIX = 'issue-';
function getIssueIdFromBranchName(branch){
    if(branch.startsWith(PREFIX))
        return branch.slice(PREFIX.length)
}

fastify.post('/webhook/issue-to-pr', (request, reply) => {
    // reply right away
    reply.send('')

    const {headers, body} = request;
    const eventType = headers['x-github-event'];
    const refType = body.ref_type;

    if(eventType !== 'create' || refType !== 'branch')
        return;
    // we're creating a branch

    const branch = body.ref

    const issueId = getIssueIdFromBranchName(branch);
    if(!issueId)
        return;
    // the branch name matches the pattern    

    const owner = body.repository.owner.login;
    const repo = body.repository.name;

    turnIssueIntoPr(owner, repo, issueId, branch)
    .catch(err => console.error(err))
})

fastify.listen(PORT, '0.0.0.0', function (err) {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})
