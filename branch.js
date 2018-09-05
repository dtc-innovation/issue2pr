'use strict'

const BRANCH_PREFIXES = [
  'feature',
  'feat',
  'fix',
  'issue'
].join('|')

const BRANCH_SEPARATOR = ['/', '-'].join('')

const BRANCH_REGEXP = new RegExp(`(${BRANCH_PREFIXES})[${BRANCH_SEPARATOR}]{1}(\\d+)$`)

const getIssueIdFromBranchName = (branchName) => {
  const [,, issueId = null] = BRANCH_REGEXP.exec(branchName) || []

  return issueId > 0 ? parseFloat(issueId) : null
}

module.exports = { getIssueIdFromBranchName }
