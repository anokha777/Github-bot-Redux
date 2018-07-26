import 'jquery';
import 'popper.js';
import 'bootstrap';

//const {createStore} = Redux; //from cdn
const headerNavbarModule = require('./view/navbar-view');
//const createStore = Redux.createStore;// ES6
import { createStore } from 'redux'; //from npm..
import { createRepoWidget } from './view/create-repo-wid-view';
import { hitEnter } from './controller/create-repo'


hitEnter();


