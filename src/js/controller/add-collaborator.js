import { createRepoWidget } from '../view/create-repo-wid-view';
import { createIssueWidget } from '../view/create-issue-wid-view';
import { listAllIssues } from '../view/list-all-issues';

import { recastAPIservice } from '../service/recastAPI-service';
import { store } from '../state/store';
import { createRepoService } from '../service/create-repo-service';
import { showErrorMsg, showSuccessMsg } from '../view/show-success-error'
import { createIssueService } from '../service/create-issue-service';
import { addCollaboratorService } from '../service/add-collab-service';



function addCollaboratorCtrl (repositoryName, collaboratorUsrName){
    addCollaboratorService(repositoryName, collaboratorUsrName).then((gitAddCollaboratorRes) => {
        console.log('create-repo.js response from git create api = '+gitAddCollaboratorRes);  
        var oldDOMErrOrSucc = document.getElementById('msg');
        while(oldDOMErrOrSucc.firstChild){
            oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
        }
        var errOrSuccMessageElement = document.getElementById("msg");
        var errorOrSuccDiv = document.createElement('div');

        if(isNaN(gitAddCollaboratorRes.id)){
            errorOrSuccDiv.innerHTML = showErrorMsg('Either Github user name - '+collaboratorUsrName+' or Repository name - '+ repositoryName+ ' is not available. Please check either of these.');
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }else{
            errorOrSuccDiv.innerHTML = showSuccessMsg('We have successfully sent a request to '+ collaboratorUsrName +' for collaborator role - '+'admin'+' in your repository - ' + repositoryName);
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }
    }).catch(function(err){
        console.log(err, 'Error occured while creating repository in github..');
    });
}

export { addCollaboratorCtrl };