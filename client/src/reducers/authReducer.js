import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const initialState = {
	isAuthenticated: false,
	user: {},
	error: ''
}

const authReducer = (state = initialState, action) => {
	switch(action.type){
		case 'GOOGLE_AUTH_LOGIN':
			setAuthorizationToken(action.payload);
			localStorage.setItem('jwtToken', action.payload)
			state = {...state, isAuthenticated: true, user: jwtDecode(action.payload)}
			break;
		case 'GOOGLE_AUTH_LOGOUT':
			setAuthorizationToken(false);
			localStorage.removeItem('jwtToken');
			state = {...state, isAuthenticated: false, user: {}}
			break;
		default:
			return state
	}
	return state;
}

export default authReducer