import { createRepoWidget } from '../view/create-repo-wid-view';
import { createIssueWidget } from '../view/create-issue-wid-view';
import { listAllIssues } from '../view/list-all-issues';
import { store } from '../state/store';
import { createRepoService } from '../service/create-repo-service';
import { showErrorMsg, showSuccessMsg } from '../view/show-success-error'

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

//render subscribe
const render = () => {
    let appState = store.getState();
    console.log('in render() create-repo.js = '+appState);

    var oldDOMrepoWidgetList = document.getElementById('createGithubRepo');
    while(oldDOMrepoWidgetList.firstChild){
        oldDOMrepoWidgetList.removeChild(oldDOMrepoWidgetList.firstChild);
    }
    var createRepoWidgetEle = document.getElementById("createGithubRepo");
   for(var i = appState.tasksList.length-1 ; i >= 0 ; --i){
        if(appState.tasksList[i].taskWidgetName === 'create-git-repo'){
            console.log('inside if');              
           
            let newRepowidget = document.createElement('div');
            newRepowidget.innerHTML=createRepoWidget(appState.tasksList[i].repositoryName, i);
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
        }
    }
}

//to display current store status on ui
store.subscribe(render);
render();

export { render, createRepositoryOnGithub };