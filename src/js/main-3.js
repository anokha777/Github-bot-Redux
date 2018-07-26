//Lesson-1 Redux store methods : getState(), dispatch() , subscribe()

const {createStore} = Redux; //from cdn
//const createStore = Redux.createStore;// ES6
//import { createStore } from 'redux'; //from npm

// reducer to manage store's state 
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT' :
            return state + 1;
        case 'DECREMENT' :
            return state - 1;
        default :
            return state;
    }
}

const store = createStore(counter)

//render subscribe
const render = () => {
    document.body.innerText = store.getState();
}

//to display current store status on iu
store.subscribe(render);
render();

document.getElementById("addTask").addEventListener("click", () => {
    store.dispatch({type:'INCREMENT'});
});

// document.addEventListener('click', () => {
//     store.dispatch({type:'INCREMENT'});
// })


