import axios from 'axios';

export default function setAuthorizationToken(token){
	if(token){
		// axios.defaults.baseURL = 'https://localhost:8080';
		axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
	}else{
		delete axios.defaults.headers.common['Authorization'];
	}
}

