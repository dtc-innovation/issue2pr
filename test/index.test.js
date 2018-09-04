const { Application } = require('probot')

const myProbotApp = require('..')
const { getIssueIdFromBranchName } = require('../branch.js')

const branchCreatedPayload = require('./fixtures/create.branch.json')
const issueResponse = require('./fixtures/issue.json')

test('issue identification', () => {
  expect(getIssueIdFromBranchName('feature/16')).toBe(16)
  expect(getIssueIdFromBranchName('feat-16')).toBe(16)
  expect(getIssueIdFromBranchName('fix-16')).toBe(16)
  expect(getIssueIdFromBranchName('issue-33')).toBe(33)
  expect(getIssueIdFromBranchName('anonymous-patch-1')).toBe(null)
})

describe('My Probot app', () => {
  let app, github

  beforeEach(() => {
    app = new Application()
    // Initialize the app based on the code from index.js
    app.load(myProbotApp)
    // This is an easy way to mock out the GitHub API
    github = {
      request: jest.fn().mockReturnValue(Promise.resolve({})),
      issues: {
        get: jest.fn().mockReturnValue(Promise.resolve(issueResponse))
      }
    }
    // Passes the mocked out GitHub API into out app instance
    app.auth = () => Promise.resolve(github)
  })

  test('turns an issue into a PR when a matching branch is created', async () => {
    // Simulates delivery of an issues.opened webhook
    await app.receive({
      name: 'create',
      payload: branchCreatedPayload
    })

    // This test passes if the code in your index.js file calls `context.github.issues.createComment`
    expect(github.request).toHaveBeenCalled()
  })
})

// For more information about testing with Jest see:
// https://facebook.github.io/jest/
