const githubApp = function (state = { tasksList: [] }, action) {
    let newState;
    let newStateList;
    switch (action.type) {
        case "create-git-repo":
            newState = Object.assign({tasksList:[]},state);
            if(newState !== null ){               
                (newState.tasksList).push(action.data);
            }
            return newState;
        case "create-git-issue":
            newState = Object.assign({tasksList:[]},state);
            if(newState !== null ){               
                (newState.tasksList).push(action.data);
            }
            return newState;
        case "fetch-all-git-issue":
            newState = Object.assign({tasksList:[]},state);
            if(newState !== null ){               
                (newState.tasksList).push(action.data);
            }
            return newState;
            // newState = Object.assign({},state);
            // newStateList = [...newState.tasksList, action.data];
            // newState.tasksList = newStateList;
            // return newState;
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
            return newState;
        default :
            return state;
    }
}

const initialState = function (state , action) {
    return JSON.parse(window.localStorage.getItem("redux-store")) || [];
}

export { githubApp, initialState }