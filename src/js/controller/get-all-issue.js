import { listAllIssues } from '../view/list-all-issues';
import { showErrorMsg, showSuccessMsg } from '../view/show-success-error'
import { getAllIssuesForRepoService } from '../service/get-all-issue-services';



function getAllIssuesForRepoCtrl (appState){
    console.log('appState in get-all-issue.js=====' + appState);

    // to remove all issue list
    var oldDOMErrOrSucc = document.getElementById('msg');
    while(oldDOMErrOrSucc.firstChild){
        oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
    }
    //to hide the last comment on issue pan
    document.getElementById('lastIssueComment').style.display = 'none';
    var errOrSuccMessageElement = document.getElementById("msg");
    var errorOrSuccDiv = document.createElement('div');
    
    if(appState.tasksList.length > 0){
        errorOrSuccDiv.innerHTML = showSuccessMsg('Please find below total '+ appState.tasksList[appState.tasksList.length - 1].listOfIssues.length +' issue from github repository - ' + appState.tasksList[0].repositoryName);
        errOrSuccMessageElement.appendChild(errorOrSuccDiv);
    //display all issues for a repository
    //to remove old issue list value from DOM                
    var oldDOMIssuesList = document.getElementById('tableBody');
    while(oldDOMIssuesList.firstChild){
        oldDOMIssuesList.removeChild(oldDOMIssuesList.firstChild);
    }
    var tableBody = document.getElementById('tableBody');
    //var table = document.createElement('table');
    for (var i = appState.tasksList[appState.tasksList.length - 1].listOfIssues.length - 1 ; i >= 0 ; --i){
        var tr = document.createElement('tr');   

        var td0 = document.createElement('td');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');

        var repoTag = document.createElement('a');
        repoTag.setAttribute('href',appState.tasksList[appState.tasksList.length - 1].listOfIssues[i].user.html_url);
        repoTag.setAttribute('target',"_blank");
        repoTag.innerHTML = "Go Owner Home";

        var issueTag = document.createElement('a');
        issueTag.setAttribute('href',appState.tasksList[appState.tasksList.length - 1].listOfIssues[i].html_url);
        issueTag.setAttribute('target',"_blank");
        issueTag.innerHTML = "Open Issue";

        var radioBtn = document.createElement('input');
        radioBtn.type = "radio";
        radioBtn.name = "issue";
        radioBtn.value = appState.tasksList[appState.tasksList.length - 1].listOfIssues[i].number;

        var issueNo = document.createTextNode(appState.tasksList[appState.tasksList.length - 1].listOfIssues[i].number);
        var issueTitle = document.createTextNode(appState.tasksList[appState.tasksList.length - 1].listOfIssues[i].title);
        var issueStatus = document.createTextNode(appState.tasksList[appState.tasksList.length - 1].listOfIssues[i].state);
        var issueLabel = document.createTextNode(appState.tasksList[appState.tasksList.length - 1].listOfIssues[i].labels[0].name);
        var createTm = document.createTextNode(appState.tasksList[appState.tasksList.length - 1].listOfIssues[i].created_at);

        td0.appendChild(radioBtn);
        td1.appendChild(issueNo);
        td2.appendChild(issueTitle);
        td3.appendChild(issueStatus);
        td4.appendChild(issueLabel);
        td5.appendChild(repoTag);
        td6.appendChild(issueTag);
        td7.appendChild(createTm);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tableBody.appendChild(tr);
    }


    }else{
        errorOrSuccDiv.innerHTML = showErrorMsg('There is no issue for repository - '+appState.tasksList[0].repositoryName);
        errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
    }















    // getAllIssuesForRepoService(appState).then((gitAllIssueRes) => {
    //     console.log('create-repo.js response from git create api = '+gitAllIssueRes);  
    //     var oldDOMErrOrSucc = document.getElementById('msg');
    //     while(oldDOMErrOrSucc.firstChild){
    //         oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
    //     }

    //     //to hide the last comment on issue pan
    //     document.getElementById('lastIssueComment').style.display = 'none';

    //     var errOrSuccMessageElement = document.getElementById("msg");
    //     var errorOrSuccDiv = document.createElement('div');

    //     if(gitAllIssueRes.length > 0){
    //         errorOrSuccDiv.innerHTML = showSuccessMsg('Please find below total '+ gitAllIssueRes.length +' issue from github repository - ' + repositoryName);
    //         errOrSuccMessageElement.appendChild(errorOrSuccDiv);
    // //display all issues
    //     //to remove old issue list value from DOM                
    //     var oldDOMIssuesList = document.getElementById('tableBody');
    //     while(oldDOMIssuesList.firstChild){
    //         oldDOMIssuesList.removeChild(oldDOMIssuesList.firstChild);
    //     }
    //     //document.getElementById("displayAllIssues").style.display = 'block';
    //     var tableBody = document.getElementById('tableBody');
    //     //var table = document.createElement('table');
    //     for (var i = 0; i < gitAllIssueRes.length; i++){
    //         var tr = document.createElement('tr');   

    //         var td0 = document.createElement('td');
    //         var td1 = document.createElement('td');
    //         var td2 = document.createElement('td');
    //         var td3 = document.createElement('td');
    //         var td4 = document.createElement('td');
    //         var td5 = document.createElement('td');
    //         var td6 = document.createElement('td');
    //         var td7 = document.createElement('td');

    //         var repoTag = document.createElement('a');
    //         repoTag.setAttribute('href',gitAllIssueRes[i].user.html_url);
    //         repoTag.setAttribute('target',"_blank");
    //         repoTag.innerHTML = "Go Owner Home";

    //         var issueTag = document.createElement('a');
    //         issueTag.setAttribute('href',gitAllIssueRes[i].html_url);
    //         issueTag.setAttribute('target',"_blank");
    //         issueTag.innerHTML = "Open Issue";

    //         var radioBtn = document.createElement('input');
    //         radioBtn.type = "radio";
    //         radioBtn.name = "issue";
    //         radioBtn.value = gitAllIssueRes[i].number;

    //         var issueNo = document.createTextNode(gitAllIssueRes[i].number);
    //         var issueTitle = document.createTextNode(gitAllIssueRes[i].title);
    //         var issueStatus = document.createTextNode(gitAllIssueRes[i].state);
    //         var issueLabel = document.createTextNode(gitAllIssueRes[i].labels[0].name);
    //         var createTm = document.createTextNode(gitAllIssueRes[i].created_at);

    //         td0.appendChild(radioBtn);
    //         td1.appendChild(issueNo);
    //         td2.appendChild(issueTitle);
    //         td3.appendChild(issueStatus);
    //         td4.appendChild(issueLabel);
    //         td5.appendChild(repoTag);
    //         td6.appendChild(issueTag);
    //         td7.appendChild(createTm);
    //         tr.appendChild(td0);
    //         tr.appendChild(td1);
    //         tr.appendChild(td2);
    //         tr.appendChild(td3);
    //         tr.appendChild(td4);
    //         tr.appendChild(td5);
    //         tr.appendChild(td6);
    //         tr.appendChild(td7);
    //         tableBody.appendChild(tr);
    //     }


    //     }else{
    //         errorOrSuccDiv.innerHTML = showErrorMsg('There is no issue for repository - '+repositoryName);
    //         errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
    //     }
    // }).catch(function(err){
    //     console.log(err, 'Error occured while creating repository in github..');
    // });
}

export { getAllIssuesForRepoCtrl };