import { applyMiddleware, createStore, combineReducers } from 'redux';
import promise from "redux-promise-middleware"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import picReducer from './reducers/picReducer';

import { googleAuthLogin } from './actions/loginAction';
import setAuthorizationToken from './utils/setAuthorizationToken';



const middleware = applyMiddleware(logger, thunk, promise())
const allReducers = combineReducers({
	authReducer: authReducer, picReducer: picReducer
});

const store = createStore(allReducers, composeWithDevTools(middleware))

if(localStorage.jwtToken === 'undefined'){
	localStorage.removeItem('jwtToken');
}

if(localStorage.jwtToken){
	setAuthorizationToken(localStorage.jwtToken);
	store.dispatch(googleAuthLogin(localStorage.jwtToken))
}

export default store
