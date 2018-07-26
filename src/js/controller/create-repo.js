import { createRepoWidget } from '../view/create-repo-wid-view';
import { createIssueWidget } from '../view/create-issue-wid-view';
import { listAllIssues } from '../view/list-all-issues';

import { recastAPIservice } from '../service/recastAPI-service';
//import { render } from './controller/create-repo';
import { store } from '../state/store';
import { createRepoService } from '../service/create-repo-service';
import { showErrorMsg, showSuccessMsg } from '../view/show-success-error'

function hitEnter() {
    document.getElementById('gitcmd').addEventListener('keydown', (e) => {
        //to remove error or success message
        var oldDOMErrOrSucc = document.getElementById('msg');
        while(oldDOMErrOrSucc.firstChild){
            oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
        }
        if (e.keyCode === 13) {
            event.preventDefault();
            
            //calling recast api
            recastAPIservice(document.getElementById('gitcmd').value).then((recastResponse) => {
                console.log('main.js action name = '+recastResponse.intents[0].slug);  
                if(recastResponse.intents[0].slug === 'create-git-repo'){
                store.dispatch({
                    type : recastResponse.intents[0].slug, 
                    data: {taskWidgetName: recastResponse.intents[0].slug, 
                            repositoryName: recastResponse.entities.git_repo[0].value
                            }
                }); 
                }else if(recastResponse.intents[0].slug === 'create-git-issue'){
                    store.dispatch({
                        type : recastResponse.intents[0].slug, 
                        data: {taskWidgetName: recastResponse.intents[0].slug, 
                                repositoryName: recastResponse.entities.git_repo[0].value, 
                                issuename: recastResponse.entities.git_issue[0].value
                            }
                    }); 
                }else if(recastResponse.intents[0].slug === 'fetch-all-git-issue'){
                    store.dispatch({
                        type : recastResponse.intents[0].slug, 
                        data: {taskWidgetName: recastResponse.intents[0].slug, 
                                repositoryName: recastResponse.entities.git_repo[0].value
                            }
                    }); 
                }

            }).catch(function(err){
                console.log(err, 'error in main.js ...-');
            });
        }
    })
}

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
    //var appState = state.split(',');

    var oldDOMrepoWidgetList = document.getElementById('createGithubRepo');
    //var oldDOMissueWidgetList = document.getElementById('createGithubIssue');
    while(oldDOMrepoWidgetList.firstChild){
        oldDOMrepoWidgetList.removeChild(oldDOMrepoWidgetList.firstChild);
    }
    // while(oldDOMissueWidgetList.firstChild){
    //     oldDOMissueWidgetList.removeChild(oldDOMissueWidgetList.firstChild);
    // }
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
            //let createIssueWidgetEle = document.getElementById("createGithubRepo");
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

export { render, hitEnter, createRepositoryOnGithub };