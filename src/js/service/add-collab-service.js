import { GITHUB_API_TOKEN, GITHUB_API_USER_URL } from '../constants/constant';

const addCollaboratorService = (repositoryName, collaboratorUsrName) => {
    return new Promise((resolve, reject) => {

        fetch(GITHUB_API_USER_URL + repositoryName +  '/collaborators/' + collaboratorUsrName + '?permission=admin', {
            method: "PUT",
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
  export { addCollaboratorService };