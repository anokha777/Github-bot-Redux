import { showErrorMsg, showSuccessMsg } from '../view/show-success-error';
import { submitIssueCommentService, showLastCommentService, closeIssueService } from '../service/edit-issue-service';

//function to submit comment on github issue for a repository
window.submitIssueCommentOnGithub = function (repositoryName, cmtOnIssue, pan_id){
    var IssueNumber = document.querySelector('input[name="issue"]:checked').value;
    submitIssueCommentService(repositoryName, IssueNumber, cmtOnIssue).then((gitIssueCmtRes) => {
        console.log('edit-issue.js response from git create api = '+gitIssueCmtRes);  
        var oldDOMErrOrSucc = document.getElementById('msg');
        while(oldDOMErrOrSucc.firstChild){
            oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
        }
        var errOrSuccMessageElement = document.getElementById("msg");
        var errorOrSuccDiv = document.createElement('div');

        if(isNaN(gitIssueCmtRes.id)){
            errorOrSuccDiv.innerHTML = showErrorMsg('There is problem while commenting on issue no. - '+IssueNumber+' on Repository '+ repositoryName);
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }else{
            errorOrSuccDiv.innerHTML = showSuccessMsg('Your comment updated successfully on Issue no.- '+ IssueNumber);
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }
    }).catch(function(err){
        console.log(err, 'Error occured while commenting on issue number- '+ IssueNumber);
    });
}

//function to show lat comment from github issue for a repository
window.showLastComment = function (repositoryName, pan_id){
    var IssueNumber = document.querySelector('input[name="issue"]:checked').value;
    showLastCommentService(repositoryName, IssueNumber).then((gitIssueLastCmtRes) => {
        console.log('edit-issue.js response from git create api = '+gitIssueLastCmtRes);  
        var oldDOMErrOrSucc = document.getElementById('msg');
        while(oldDOMErrOrSucc.firstChild){
            oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
        }
        var errOrSuccMessageElement = document.getElementById("msg");
        var errorOrSuccDiv = document.createElement('div');

        if(gitIssueLastCmtRes.length > 0){
            document.getElementById("lastIssueComment").style.display = 'block';
            document.getElementById("lastIssueHeader").innerHTML = 'Below is the last comment for issue at: '+gitIssueLastCmtRes[gitIssueLastCmtRes.length -1].created_at;
            //to remove old comment value from DOM                
            var div1 = document.getElementById('actualIssueCmt');
            while(div1.firstChild){
                div1.removeChild(div1.firstChild);
            }

            var commentTag = document.createElement('a');
            commentTag.setAttribute('href',gitIssueLastCmtRes[gitIssueLastCmtRes.length -1].html_url);
            commentTag.setAttribute('target',"_blank");
            commentTag.innerHTML = gitIssueLastCmtRes[gitIssueLastCmtRes.length -1].body;
            document.getElementById("actualIssueCmt").appendChild(commentTag);       
        }else{
            document.getElementById("lastIssueComment").style.display = 'none';
            errorOrSuccDiv.innerHTML = showErrorMsg('As of now, There is no comment for issue number - '+IssueNumber);
            errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        }
    }).catch(function(err){
        console.log(err, 'Error occured while commenting on issue number- '+ IssueNumber);
    });
}


//function to close issue for a repository
window.closeIssue = function (repositoryName, pan_id){
    var IssueNumber = document.querySelector('input[name="issue"]:checked').value;

    document.getElementById("lastIssueComment").style.display = 'none';
    var oldDOMErrOrSucc = document.getElementById('msg');
    while(oldDOMErrOrSucc.firstChild){
        oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
    }
    var errOrSuccMessageElement = document.getElementById("msg");
    var errorOrSuccDiv = document.createElement('div');

    closeIssueService(repositoryName, IssueNumber).then((gitIssueClosurRes) => {
        console.log('edit-issue.js response from git closeIssue api gitIssueClosurRes = '+gitIssueClosurRes);  
        errorOrSuccDiv.innerHTML = showSuccessMsg(gitIssueClosurRes);
        errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
    }).catch(function(err){
        document.getElementById("lastIssueComment").style.display = 'none';
        errorOrSuccDiv.innerHTML = showErrorMsg(gitIssueClosurRes);
        errOrSuccMessageElement.appendChild(errorOrSuccDiv); 
        console.log(err, 'Error occured while closing issue number- '+ IssueNumber);
    });
}

export { submitIssueCommentOnGithub, showLastComment, closeIssue };


