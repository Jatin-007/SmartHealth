import { createStore, applyMiddleware, compose } from 'redux';
// import promise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'
// import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
let middleware = [thunk];

/* eslint-disable no-underscore-dangle */
const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);
/* eslint-enable */

export default store;