import { store } from '../state/store'

//Function to remove widget from UI
    window.removeWidgetFromState = function (stateID){
        var oldDOMErrOrSucc = document.getElementById('msg');
        while(oldDOMErrOrSucc.firstChild){
            oldDOMErrOrSucc.removeChild(oldDOMErrOrSucc.firstChild);
        }
        store.dispatch({
            type : 'DELETE-A-WIDGET', 
            data: { stateID : stateID }
        });
    
    }

export { removeWidgetFromState };
