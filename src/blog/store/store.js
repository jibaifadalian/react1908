import { createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from "redux-thunk";
import reduxPromise from 'redux-promise';

import reducer from './reducers/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//创建store  应用中间件，如果action是函数，中间件处理
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk, reduxPromise)));

export default store;

