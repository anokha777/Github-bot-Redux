import { GITHUB_API_TOKEN, GITHUB_API_USER_URL } from '../constants/constant';

const createIssueService = (repositoryName, issueName, commandComment) => {
    return new Promise((resolve, reject) => {

        fetch(GITHUB_API_USER_URL + repositoryName + '/issues', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token '+GITHUB_API_TOKEN
            },
            body: JSON.stringify({
                "title": issueName,
                "body": commandComment,
                "assignees": ["anokha777"],
                "labels": ["bug"]
            })
        }).then((res) => {
            res.json().then((data) => {
                resolve(data);
            });
        }).catch(function () {
            reject(err)
            console.log(err,"There is error while creating git issue through github api...");
        });
    });
  };
  export { createIssueService };