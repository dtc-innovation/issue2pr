import ghGot from 'gh-got';

const BASE_GITHUB_API = 'https://api.github.com';

const token = process.env.GITHUB_TOKEN;

// URLs
function makePullRequestURL(owner, repo){
    return `${BASE_GITHUB_API}/repos/${owner}/${repo}/pulls`;
}

export default function turnIssueIntoPR(owner, repo, issueId, branch){
    return ghGot(
        makePullRequestURL(owner, repo),
        {
            method: 'POST',
            token,
            body: {
                "issue": issueId,
                "head": branch,
                "base": "master"
            }
        }
    )
}
