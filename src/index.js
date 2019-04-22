import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from 'react-redux';
import Reducer from './store/reducers';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleWare from 'redux-thunk'

let logger = createLogger();

let composeEnhancers = composeWithDevTools() || compose;

const store = createStore(Reducer, compose(applyMiddleware(thunkMiddleWare, logger), composeEnhancers));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
