import { removeWidgetFromState } from '../controller/remove-widget';
import { submitIssueCommentOnGithub, showLastComment } from '../controller/edit-issue';
//function to show all issues for a repo widget
const listAllIssues = (repositoryName, pan_id) => {
    return `<div class="displayAllIssues panBackground" id="displayAllIssues">
    <div class="panComponents">
    <div> Issues for repository - ${repositoryName}</div>
    <span id='close' onclick='removeWidgetFromState(${pan_id})'>x</span>
        <table class="table table-striped" id="issuesTable">
            <thead>
                <tr>
                    <th>Select to Comment</th>
                    <th>Issue No.</th>
                    <th>Issue Title</th>
                    <th>Issue Status</th>
                    <th>Issue Label</th>
                    <th>Repository URL</th>
                    <th>Issue URL</th>
                    <th>Created Time</th>
                </tr>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
        <div class="form-row">
            <div class="form-group col-md-12">
                <label for="cmtOnIssue">Comment on Issue: </label>
                <textarea class="form-control commandComment" id="cmtOnIssue" name="cmtOnIssue"></textarea>
            </div>
            <button type="submit" class="btn btn-primary float-left" onclick="submitIssueCommentOnGithub('${repositoryName}', document.getElementById('cmtOnIssue').value, ${pan_id});">
                Submit Issue Comment</button>
            <button type="submit" class="btn btn-success float-right" onclick="showLastComment('${repositoryName}', ${pan_id});">
                Show Last Comment of Selected Issue</button>
            <button type="submit" class="btn btn-warning float-right" onclick="javascript:closeIssue('${repositoryName}', ${pan_id});">
                Close Selected Issue</button>
        </div>

        <div class="col-sm-12 col-md-12 lastIssueComment" id="lastIssueComment">
            <div class="alert alert-info">
                <span class="glyphicon glyphicon-info-sign"></span>
                <strong id="lastIssueHeader"></strong>
                <hr class="message-inner-separator">
                <p id="actualIssueCmt"></p>
            </div>
        </div>
        <input type="hidden" id="repo_name" />
    </div>
</div>`;
}


export { listAllIssues };


