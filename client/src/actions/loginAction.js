export function googleAuthLogout(){
	return {
		type: 'GOOGLE_AUTH_LOGOUT'
	}
}

export function googleAuthLogin(token){
	return {
		type: 'GOOGLE_AUTH_LOGIN', payload: token
	}
}
