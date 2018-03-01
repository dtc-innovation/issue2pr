# Turn issues into PRs

It is not possible to transform an issue into a PR from Github UI. However, it's possible from the API.

Deploy this application, register the webhook and then, pushing branches following the `issue-XXX` pattern will lead to the `XXX` issue being turned into a PR with the code of the branch.

## How

https://turn-issue-into-pr.herokuapp.com/webhook/issue-to-pr can be registered as a webhook. This webhook listens to the `create` event. Currently, it only works on repos where i (@DavidBruant) have write access, but it's easy to deploy it yourself.

## Licence

MIT
