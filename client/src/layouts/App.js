import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../components/googleLogin';
import { googleAuthLogout } from '../actions/loginAction';
import { updatePictureState } from '../actions/picAction'


class App extends Component {
  componentWillMount(){
    this.props.updatePictureState();
  }
  render() {
    return (
      <div className="container mainBox">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
                <Link to='/'>{this.props.user.givenName || 'Welcome'}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to='/all-pics'><NavItem eventKey={1}>Browser All Pictures</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight style={{marginRight: 10}}>
              {this.props.auth &&  <LinkContainer to='/my-pic'><NavItem eventKey={1}>My Pictures</NavItem></LinkContainer> }
              {!this.props.auth && <NavItem eventKey={2}><Login/></NavItem> }
              {this.props.auth && <NavItem eventKey={3} onClick={this.props.googleAuthLogout}>Logout</NavItem> }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        <Jumbotron>
          {this.props.children}
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.authReducer.user,
    auth: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps, { googleAuthLogout, updatePictureState }, null, {pure: false})(App);