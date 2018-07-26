import { createStore } from 'redux';
import { githubApp } from '../state/appState';

const store = createStore(githubApp);

export { store };