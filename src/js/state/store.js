import { createStore } from 'redux';
import { githubApp } from '../state/appState';
import { initialState } from '../state/appState'; 

console.log('initialState==== ',initialState);
console.log('initialState1111==== ',JSON.parse(window.localStorage.getItem("redux-store")));

const store = createStore(githubApp, JSON.parse(window.localStorage.getItem("redux-store")));

export { store };