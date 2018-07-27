import { removeWidgetFromState } from '../controller/remove-widget'
import { createRepositoryOnGithub } from '../controller/create-repo'

//function to create widget for create repository
let createRepoWidget = (recastRepoName, pan_id) => {
//window.createRepoWidget = function (recastRepoName, pan_id){
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


export { createRepoWidget };


