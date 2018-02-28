# Turn issues into PRs

Deploy this application, register the webhook and then, pushing branches following the `issue-XXX` pattern will lead to the `XXX` issue being turned into a PR with the code of the branch.

## How

https://turn-issue-into-pr.herokuapp.com/webhook/issue-to-pr is deployed to run a server.

This server exposes one endpoint that is meant to be used as a github webhook for the `create` event.

## Licence

MIT