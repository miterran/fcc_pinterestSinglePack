import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

export default function(ComposedComponent){
	class Authenticate extends React.Component{
		render(){
			if(!this.props.userAuth.isAuthenticated){
				return <Redirect to='/' />
			}
			return(
				<ComposedComponent {...this.props} />
			)
		}
	}
	function mapStateToProps(state){
		return {
			userAuth: state.authReducer
		}
	}
	return connect(mapStateToProps, null)(Authenticate);
}