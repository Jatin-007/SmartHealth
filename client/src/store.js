import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'
import {reducer as formReducer} from 'redux-form';

const initialState = {};
let middleware = [thunk];

/* eslint-disable no-underscore-dangle */
const store = createStore(
    rootReducer,
    initialState,
    formReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);
/* eslint-enable */

export default store;