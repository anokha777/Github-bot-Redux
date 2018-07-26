import { createRepoWidget } from '../view/create-repo-wid-view';
import { createIssueWidget } from '../view/create-issue-wid-view';
import { listAllIssues } from '../view/list-all-issues';

import { recastAPIservice } from '../service/recastAPI-service';
//import { render } from './controller/create-repo';
import { store } from '../state/store';
import { createRepoService } from '../service/create-repo-service';
import { showErrorMsg, showSuccessMsg } from '../view/show-success-error'


window.createIssueOnGithub = function (repositoryName, IssueName, commandComment, pan_id){
    createIssueService(repositoryName, IssueName, commandComment).then((gitCreateIssueRes) => {
        console.log('create-repo.js response from git create api = '+gitCreateIssueRes);  
        var oldDOMErrOrSucc = document.getElementById('msg');
        while(oldDOMErrOrSucc.firstChild){
            oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
        }
        var errOrSuccMessageElement = document.getElementById("msg");
        var errorOrSuccDiv = document.createElement('div');

        if(isNaN(gitCreateIssueRes.id)){
            errorOrSuccDiv.innerHTML = showErrorMsg('There is Issue while creating on Repository '+ repositoryName);
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }else{
            errorOrSuccDiv.innerHTML = showSuccessMsg('Issue '+ IssueName +' created successfully on Repository ' + repositoryName);
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }
    }).catch(function(err){
        console.log(err, 'Error occured while creating repository in github..');
    });
}

export { createIssueOnGithub };