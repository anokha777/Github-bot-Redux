import { removeWidgetFromState } from '../controller/remove-widget';
import { createIssueOnGithub } from '../controller/create-issue';
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


export { createIssueWidget };


