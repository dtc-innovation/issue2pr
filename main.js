throw 'TODO : apparently, to create a pull request, there needs to be additional commits...blaaaahhhhh';
throw 'missing token';

var BASE_GITHUB_API = 'https://api.github.com'

// URLs
function makeCommitURL(owner, repo){
    return BASE_GITHUB_API+'/repos/'+owner+'/'+repo+'/commits';
}

function makePullRequestURL(owner, repo){
    return BASE_GITHUB_API+'/repos/'+owner+'/'+repo+'/pulls';
}

function makeRefURL(owner, repo){
    return BASE_GITHUB_API+'/repos/'+owner+'/'+repo+'/git/refs';
}


// API functions
function getLatestCommitSha(owner, repo){
    const response = UrlFetchApp.fetch(
        makeCommitURL(owner, repo)+'?access_token='+token
    );

    return JSON.parse(response.getContentText())[0].sha
}


function makeBranchOverMainBranch(owner, repo, newBranchName){
    const sha = getLatestCommitSha(owner, repo);

    const resp = UrlFetchApp.fetch(
        makeRefURL(owner, repo)+'?access_token='+token, 
        {
            'method' : 'post',
            'payload' : JSON.stringify({
                'ref': 'refs/heads/'+newBranchName,
                'sha': sha
            }),
            'muteHttpExceptions': true
        }
    );
}



// Business
function turnIssueIntoPR(owner, repo, issueId){
    const PRhead = "issue-"+issueId;

    makeBranchOverMainBranch(owner, repo, PRhead);

    const resp2 = UrlFetchApp.fetch(
        makePullRequestURL(owner, repo)+'?access_token='+token, 
        {
            'method' : 'post',
            'payload' : JSON.stringify({
                "issue": issueId,
                "head": PRhead,
                "base": "master"
            }),
            'muteHttpExceptions': true
        }
    );

    Logger.log(resp2.getContentText());
}

function test(){
    turnIssueIntoPR('DavidBruant', 'turn-issues-into-prs', '1')
}