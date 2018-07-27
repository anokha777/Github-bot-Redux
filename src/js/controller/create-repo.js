//import { createRepoWidget } from '../view/create-repo-wid-view';
//import { createIssueWidget } from '../view/create-issue-wid-view';
import { listAllIssues } from '../view/list-all-issues';
import { store } from '../state/store';
import { createRepoService } from '../service/create-repo-service';
import { showErrorMsg, showSuccessMsg } from '../view/show-success-error';
import { getAllIssuesForRepoCtrl } from './get-all-issue';
import { removeWidgetFromState } from '../controller/remove-widget';
import { createIssueOnGithub } from '../controller/create-issue';

   // to store into local storage
//    let data = JSON.parse(window.localStorage.getItem("redux-store")) || [];
//    store.dispatch({ type: 'REFRESH', data});

window.createRepositoryOnGithub = function (repositoryName, commandComment, pan_id){
    createRepoService(repositoryName, commandComment).then((gitCreateRepoRes) => {
        console.log('create-repo.js response from git create api = '+gitCreateRepoRes);  
        var oldDOMErrOrSucc = document.getElementById('msg');
        while(oldDOMErrOrSucc.firstChild){
            oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
        }
        var errOrSuccMessageElement = document.getElementById("msg");
        var errorOrSuccDiv = document.createElement('div');

        if(isNaN(gitCreateRepoRes.id)){
            errorOrSuccDiv.innerHTML = showErrorMsg('Repository '+ repositoryName + ' already exists on this account.');
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }else{
            errorOrSuccDiv.innerHTML = showSuccessMsg('Repository '+ repositoryName + ' is successfully created on this account.');
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }
    }).catch(function(err){
        console.log(err, 'Error occured while creating repository in github..');
    });
}
  
//function to create widget for create repository
const createRepoWidget = (recastRepoName, pan_id) => {
        return `<div class='createGithubRepo panBackground' id='createGithubRepo_${pan_id}' >
        <div class='panComponents'>
        <span id='close' onclick='removeWidgetFromState(${pan_id})'>x</span>
            <div class='form-row'>
                <div class='form-group col-md-12'>
                    <label for='repositoryName'>Repository Name: </label>
                    <input type='text' class='form-control' id='repositoryName_${pan_id}' name='repositoryName' value="${recastRepoName}" />
                </div>
            </div>
            <div class='form-row'>
                <div class='form-group'>
                    <label for='commandComment'>Comment: </label>
                    <textarea class='form-control commandComment' id='commandComment_${pan_id}' name='commandComment'></textarea>
                </div>
            </div>
        
            <button type='submit' class='btn btn-primary' onclick='createRepositoryOnGithub(document.getElementById("repositoryName_${pan_id}").value, document.getElementById("commandComment_${pan_id}").value, ${pan_id});'>Create Github Repository</button>
        </div>
        </div>`;
    }

    //function to create widget for create repository
const createIssueWidget = (recastIssueRepoName, recastIssueName, pan_id) => {
    return `<div class="createGithubIssue panBackground" id="createGithubIssue">
    <div class="panComponents">
        <span id='close' onclick='removeWidgetFromState(${pan_id})'>x</span>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="issueRepoName">Repository Name: </label>
                <input type="text" class="form-control" id="issueRepoName_${pan_id}" name="issueRepoName" value="${recastIssueRepoName}" />
            </div>
            <div class="form-group col-md-6">
                <label for="issueName">Issue Name: </label>
                <input type="text" class="form-control" id="issueName_${pan_id}" name="issueName" value="${recastIssueName}" />
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="issueCommandComment">Comment: </label>
                <textarea class="form-control commandComment" id="issueCommandComment_${pan_id}" name="issueCommandComment"></textarea>
            </div>
        </div>

        <button type="submit" class="btn btn-primary" onclick="createIssueOnGithub(document.getElementById('issueRepoName_${pan_id}').value, document.getElementById('issueName_${pan_id}').value, document.getElementById('issueCommandComment_${pan_id}').value, ${pan_id});">
            Create Github Issue</button>


    </div>
</div>`;
}

//render subscribe
// const render = (currentState) => {
window.render = function (currentState){
    //let appState = store.getState();
    let appState = currentState;
    console.log('in render() create-repo.js = '+appState);

    var oldDOMrepoWidgetList = document.getElementById('createGithubRepo');
    while(oldDOMrepoWidgetList.firstChild){
        oldDOMrepoWidgetList.removeChild(oldDOMrepoWidgetList.firstChild);
    }
    var createRepoWidgetEle = document.getElementById("createGithubRepo");
    if(JSON.parse(window.localStorage.getItem("redux-store")) !== null){
        for(var i = appState.tasksList.length-1 ; i >= 0 ; --i){
                if(appState.tasksList[i].taskWidgetName === 'create-git-repo'){
                    console.log('inside if');              
                
                    let newRepowidget = document.createElement('div');
                    newRepowidget.innerHTML=createRepoWidget(appState.tasksList[i].repositoryName, i);
                    //newRepowidget.innerHTML=createRepoWidget;
                    createRepoWidgetEle.appendChild(newRepowidget);
                }
                if(appState.tasksList[i].taskWidgetName === 'create-git-issue'){
                    console.log('inside if - create-git-issue');
                    let newIssuewidget = document.createElement('div');
                    newIssuewidget.innerHTML=createIssueWidget(appState.tasksList[i].repositoryName, appState.tasksList[i].issuename, i);
                    createRepoWidgetEle.appendChild(newIssuewidget);
                }
                if(appState.tasksList[i].taskWidgetName === 'fetch-all-git-issue'){
                    console.log('inside if - fetch-all-git-issue');
                    let newIssueListwidget = document.createElement('div');
                    newIssueListwidget.innerHTML=listAllIssues(appState.tasksList[i].repositoryName, i);
                    createRepoWidgetEle.appendChild(newIssueListwidget);
                    getAllIssuesForRepoCtrl(appState);
                }
                if(appState.tasksList[i].taskWidgetName === 'REFRESH'){
                    console.log('inside if------------- - REFRESH');
                    let newIssuewidget = document.createElement('div');
                    newIssuewidget.innerHTML=createIssueWidget(appState.tasksList[i].repositoryName, appState.tasksList[i].issuename, i);
                    createRepoWidgetEle.appendChild(newIssuewidget);
                }
            }
        }
}


// //Listen for changes
store.subscribe( () =>{  
  var currentState = store.getState();  
  localStorage["redux-store"] = JSON.stringify(currentState);
  //debugger;
  render(currentState);  
 });

 
localStorage["redux-store"] = JSON.stringify(store.getState());
render(store.getState());  

//to display current store status on ui
// store.subscribe(render);
// render();

export { render, createRepositoryOnGithub };