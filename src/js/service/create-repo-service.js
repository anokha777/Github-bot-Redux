import { GITHUB_API_TOKEN, GITHUB_API_CREATE_REPO_URL } from '../constants/constant';

const createRepoService = (repositoryName, commandComment) => {
    return new Promise((resolve, reject) => {

        fetch(GITHUB_API_CREATE_REPO_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'token '+GITHUB_API_TOKEN
            },
            body: JSON.stringify({
                "name": repositoryName,
                "description": commandComment
            })
        }).then((res) => {
            res.json().then((data) => {
                resolve(data);
            });
        }).catch(function () {
            reject(err)
            console.log(err,"There is error while creating git repository through github api...");
        });
    });
  };

  export { createRepoService };