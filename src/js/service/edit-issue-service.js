import { GITHUB_API_TOKEN, GITHUB_API_USER_URL } from '../constants/constant';

const submitIssueCommentService = (repositoryName, IssueNumber, cmtOnIssue) => {
    return new Promise((resolve, reject) => {
        fetch(GITHUB_API_USER_URL + repositoryName + '/issues/' +IssueNumber+ '/comments', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token '+GITHUB_API_TOKEN
            },
            body: JSON.stringify({
                "body": cmtOnIssue
            })
        }).then((res) => {
            res.json().then((data) => {
                resolve(data);
            });
        }).catch(function () {
            reject(err)
            console.log(err,"There is error while commenting on git issue through github api...");
        });
    });
  };

  const showLastCommentService = (repositoryName, IssueNumber) => {
    return new Promise((resolve, reject) => {
        fetch(GITHUB_API_USER_URL + repositoryName + '/issues/' +IssueNumber+ '/comments', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token '+GITHUB_API_TOKEN
            }}).then((res) => {
            res.json().then((data) => {
                resolve(data);
            });
        }).catch(function () {
            reject(err)
            console.log(err,"There is error while commenting on git issue through github api...");
        });
    });
  };

  const closeIssueService = (repositoryName, IssueNumber) => {
    return new Promise((resolve, reject) => {
        fetch(GITHUB_API_USER_URL + repositoryName + '/issues/' +IssueNumber, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token '+GITHUB_API_TOKEN
            }}).then((res) => {
            res.json().then((data) => {
                if(data.state === 'closed'){
                    resolve('Issue number - (' + data.number + '. ' + data.title +') is alredy closed.');
                }else{
                    fetch(GITHUB_API_USER_URL + repositoryName + '/issues/' +IssueNumber, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'token '+GITHUB_API_TOKEN
                    },
                    body: JSON.stringify({
                        "state": "closed",
                        "labels": ["closed"]
                    })
                }).then((closingRes) => {
                    closingRes.json().then(closingResJson => {
                        resolve('Issue number - ' + closingResJson.number + " closed successfully, its current status is " + closingResJson.state);
                    });
                });
                }
            });
        }).catch(function () {
            reject(err)
            console.log(err,"There is error while commenting on git issue through github api...");
        });
    });
  };





  export { submitIssueCommentService, showLastCommentService, closeIssueService };