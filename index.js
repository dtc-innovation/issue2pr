/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
const {getIssueIdFromBranchName} = require('./branch.js')

module.exports = app => {
  app.on('create', async context => {
    const {ref_type: refType, ref, master_branch: base} = context.payload

    if (refType !== 'branch') {
      return app.log(`[SKIP] not a branch.`)
    }

    const number = getIssueIdFromBranchName(ref)

    if (!number) {
      return app.log(`[SKIP] issue_id not found (${ref})`)
    }

    const params = context.issue({ number })
    const {owner, repo} = params
    app.log.debug('%s/%s/issues/%d - %o', owner, repo, number, params)
    const issue = await context.github.issues.get(params)

    if (!issue) {
      return app.log(`[SKIP] issue not found (${owner}/${repo}/${number})`)
    }

    return context.github.request({
      method: 'POST',
      url: '/repos/:owner/:repo/pulls',
      head: ref,
      issue: number,
      base,
      owner,
      repo
    })
  })
}
