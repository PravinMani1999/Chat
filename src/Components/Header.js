import React, { Component } from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,MDBBtn} from "mdbreact";
import {Link} from 'react-router-dom';
import Signup from '../Pages/Signup/Signup';
import Login from '../Pages/Login/Login';
class Header extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <div>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          Web <strong className="white-text">Chat</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">About Us</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Contact Us</MDBNavLink>
            </MDBNavItem>
            
          </MDBNavbarNav>
          <MDBNavbarNav right>
                    <div>
                    <MDBNavItem>
                    <Link to='/Login'>
                    <MDBBtn color="green" size="sm">Login</MDBBtn>
                    </Link>

                    <Link to="/Signup">
                    <MDBBtn color="green" size="sm">SignUp</MDBBtn>
                    </Link>
                    </MDBNavItem>
                    </div>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </div>
    );
  }
}

export default Header;