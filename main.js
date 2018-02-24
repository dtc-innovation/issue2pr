'use strict';

throw 'missing token'

function turnIssueIntoPR(owner, repo, issueId, branch){

    const resp2 = UrlFetchApp.fetch(
        makePullRequestURL(owner, repo)+'?access_token='+token, 
        {
            'method' : 'post',
            'payload' : JSON.stringify({
                "issue": issueId,
                "head": branch,
                "base": "master"
            }),
            'muteHttpExceptions': true
        }
    );

    Logger.log(resp2.getContentText());
}

function test(){
    turnIssueIntoPR('DavidBruant', 'turn-issues-into-prs', '1', 'test-2')
}