import { store } from '../state/store'

//Function to remove widget from UI
    window.removeWidgetFromState = function (stateID){
        store.dispatch({
            type : 'DELETE-A-WIDGET', 
            data: { stateID : stateID }
        });
    
    }

export { removeWidgetFromState };
