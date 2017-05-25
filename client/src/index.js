import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from "react-redux"
import store from "./store"

import registerServiceWorker from './registerServiceWorker';
import './App.css';

import App from './layouts/App';
import HomePage from './container/HomePage'
import AllPicsPage from './container/AllPicsPage'
import MyPicPage from './container/MyPicPage'
import requireAuth from './utils/requireAuth';

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'

ReactDOM.render(
	<Provider store={store}>
	<Router history={createBrowserHistory()}>
		<App>
			<Route exact path='/' component={HomePage} />
			<Route exact path='/all-pics' component={AllPicsPage} />
			<Route exact path='/my-pic' component={requireAuth(MyPicPage)} />
		</App>
	</Router>
	</Provider>
	, document.getElementById('root'));

registerServiceWorker();

