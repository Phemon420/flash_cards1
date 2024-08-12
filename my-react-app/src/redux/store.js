import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from 'redux-thunk'; // Ensure this is correct
import getCardDetailsReducer from './reducer/reducer.js';

const reducer = combineReducers({
    getProductDetails: getCardDetailsReducer
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
