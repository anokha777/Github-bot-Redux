import { GITHUB_API_TOKEN, GITHUB_API_USER_URL } from '../constants/constant';

const getAllIssuesForRepoService = (repositoryName) => {
    return new Promise((resolve, reject) => {

        fetch(GITHUB_API_USER_URL + repositoryName + '/issues?state=all', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token '+GITHUB_API_TOKEN
            }
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
  export { getAllIssuesForRepoService };