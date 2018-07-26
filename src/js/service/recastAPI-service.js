import { RECAST_API_URL, RECAST_APP_TOKEN } from '../constants/constant';
//Object.keys(CONSTANTS).forEach(key => window[key] = CONSTANTS[key]);

const recastAPIservice = (cmdEntered) => {
    return new Promise((resolve, reject) => {
      /*stuff using username, password*/
        fetch(RECAST_API_URL + cmdEntered, {
            method: "post",
            headers: {
                'Authorization': 'Token '+RECAST_APP_TOKEN,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                resolve(data.results);
            });
        }).catch(function (err) {
            // reject(Error("There is error in resolving name of repository from sentence..."));
            reject(err)
            console.log(err,"There is error in resolving name of repository from sentence...");
        });
    });
  };

// let  recastAPIservice = new Promise( (resolve, reject) => {
//    var text = cmdEntered;
//    var returnValue;
    
//     // return new Promise( (resolve, reject) => {
//         fetch(RECAST_API_URL + text, {
//             method: "post",
//             headers: {
//                 'Authorization': 'Token '+RECAST_APP_TOKEN,
//                 'Content-Type': 'application/json'
//             }
//         }).then((response) => {
//             response.json().then(response => {
//                 // If responce from recast.ai is to create new github repository.
//                 if (response.results.intents[0].slug == 'create-git-repo') {
//                     console.log('in recastAPIservice repoName=== '+ response.results.entities.git_repo[0].value);
//                     return Promise.resolve(response.results.entities.git_repo[0].value);
//                 }// If responce from recast.ai is to create new github issue.
//                 else if (response.results.intents[0].slug == 'create-git-issue') {
//                     returnValue = response.results.entities.git_repo[0].value+','+response.results.entities.git_issue[0].value;
//                     return Promise.resolve(returnValue);
//                 }// If responce from recast.ai is to fetch all issues for a repository.
//                 else if (response.results.intents[0].slug == 'fetch-all-git-issue') {
//                     displayAllIssues(response.results);
//                 }// If responce from recast.ai is to add git coleborator for a repository.
//                 else if (response.results.intents[0].slug == 'add-git-coleborator') {
//                     addGitCollaborator(response.results.entities.git_repo[0].value, response.results.entities.git_collaborator[0].value);
//                 }
//             }).catch(function () {
//                 return Promise.reject("There is error in resolving name of repository from sentence...");
//                 console.log("There is error in resolving name of repository from sentence...");
//                 //document.getElementById("fail_msg").style.display = 'block';
//                 //document.getElementById("fail_msg").innerHTML = 'There is error in resolving name of repository from sentence...';
//                // hideLoader();

//             });
//         }).catch(function () {
//             return Promise.reject("There is error in recast.ai api call...");
//             console.log("There is error in recast.ai api call...");
//             //document.getElementById("fail_msg").style.display = 'block';
//             //document.getElementById("fail_msg").innerHTML = 'There is error in recast.ai api call...';
//             //hideLoader();
//         });
//     // });
//   }



    // function recastAPIservice(cmdEntered) {
    //     var text = cmdEntered;
    //     var returnValue;
    //     fetch(RECAST_API_URL + text, {
    //         method: "post",
    //         headers: {
    //             'Authorization': 'Token '+RECAST_APP_TOKEN,
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((response) => {
    //         response.json().then(response => {
    //             // If responce from recast.ai is to create new github repository.
    //             if (response.results.intents[0].slug == 'create-git-repo') {
    //                 var repoName = response.results.entities.git_repo[0].value;
    //                 console.log('in recastAPIservice repoName=== '+ repoName);
    //                 returnValue = repoName;
    //                 return returnValue;
    //             }// If responce from recast.ai is to create new github issue.
    //             else if (response.results.intents[0].slug == 'create-git-issue') {
    //                 // document.getElementById("createGithubIssue").style.display = 'block';
    //                 // document.getElementById("issueRepoName").value = response.results.entities.git_repo[0].value;
    //                 // document.getElementById("issueName").value = response.results.entities.git_issue[0].value;
    //                 // document.getElementById("issueCommandComment").focus();
    //                 //hideLoader();

    //                 returnValue = response.results.entities.git_repo[0].value+','+response.results.entities.git_issue[0].value;
    //                 return returnValue;
    //             }// If responce from recast.ai is to fetch all issues for a repository.
    //             else if (response.results.intents[0].slug == 'fetch-all-git-issue') {
    //                 displayAllIssues(response.results);
    //             }// If responce from recast.ai is to add git coleborator for a repository.
    //             else if (response.results.intents[0].slug == 'add-git-coleborator') {
    //                 addGitCollaborator(response.results.entities.git_repo[0].value, response.results.entities.git_collaborator[0].value);
    //             }
    //         }).catch(function () {
    //             console.log("There is error in resolving name of repository from sentence...");
    //             document.getElementById("fail_msg").style.display = 'block';
    //             document.getElementById("fail_msg").innerHTML = 'There is error in resolving name of repository from sentence...';
    //             hideLoader();
    //         });
    //     }).catch(function () {
    //         console.log("There is error in recast.ai api call...");
    //         document.getElementById("fail_msg").style.display = 'block';
    //         document.getElementById("fail_msg").innerHTML = 'There is error in recast.ai api call...';
    //         hideLoader();
    //     });


        
    // }

  export { recastAPIservice };