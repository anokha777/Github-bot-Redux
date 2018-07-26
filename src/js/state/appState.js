

// reducer to manage store's state 
// const githubApp = (state = '', action) => {
//     switch (action.type) {
//         case 'create-git-repo':
//             //return Object.assign({commandTo: 'create-git-repo', repoName:'anokha0000'}, state);
//             return state + ',create-git-repo';
//         case 'create-git-issue' :
//             return state + ',create-git-issue';
//         case 'fetch-all-git-issue' :
//             return state + ',fetch-all-git-issue';
//         case 'add-git-coleborator' :
//             return state;
//         case 'ISSUE-COMMENT' :
//             return state;
//         case 'SHOW-ISSUE-LAST-COMMENT' :
//             return state;
//         case 'CLOSE-ISSUE' :
//             return state = state;
//         default :
//             return state +  'dafault view';
//     }
// }



const githubApp = function (state = { tasksList: [] }, action) {
    let newState;
    let newStateList;
    switch (action.type) {
        case "create-git-repo":
            newState = Object.assign({},state);
            newStateList = [...newState.tasksList, action.data];
            newState.tasksList = newStateList;
            return newState;
       case "create-git-issue":
            newState = Object.assign({},state);
            newStateList = [...newState.tasksList, action.data];
            newState.tasksList = newStateList;
            return newState;
       case "fetch-all-git-issue":
            newState = Object.assign({},state);
            newStateList = [...newState.tasksList, action.data];
            newState.tasksList = newStateList;
            return newState;
       case 'add-git-coleborator' :
            return state;
        case 'ISSUE-COMMENT' :
            return state;
        case 'SHOW-ISSUE-LAST-COMMENT' :
            return state;
        case 'CLOSE-ISSUE' :
            return state = state;
        case 'DELETE-A-WIDGET' :
            newState = Object.assign({},state);
            newState.tasksList.splice(action.data.stateID, 1);
            //newState.tasksList = newStateList;
            return newState;
        default :
            return state;
    }
}
export { githubApp }