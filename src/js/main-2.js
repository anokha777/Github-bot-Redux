//Lesson-2 Implementing store from scratch
import 'jquery';
import 'popper.js';
import 'bootstrap';

//const {createStore} = Redux; //from cdn
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

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listner) => {
        listeners.push(listner);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({});

    return { getState, dispatch, subscribe };
};

const store = createStore(counter)

console.log(store.getState()); // here state will be zero, because till now there is no action fired

//it dispaches the action for reducer.
store.dispatch({ type : 'INCREMENT' });

console.log(store.getState()); //here state will be 1, one INCREMENT has happened

//render subscribe
const render = () => {
    document.body.innerText = store.getState();
}

//to display current store status on iu
store.subscribe(render);
render();

document.getElementById('clickMe').addEventListener('click', () => {
    store.dispatch({type:'INCREMENT'});
})


