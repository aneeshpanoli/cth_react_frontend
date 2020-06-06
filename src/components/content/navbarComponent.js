import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import AvatarMenu from '../navigaton/avatarMenu';
import cthLogo from '../../Assets/img/cth.svg'

class Navbarmain extends Component {
  render() {
    return (
      // border-bottom border-dark 
        <Navbar className="pr-5 mt-3 pl-5" bg="white" variant="light" sticky="top">
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src={cthLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    Civic Tech Hub
                </Navbar.Brand>
                <div style={{position: 'absolute', right: 5, display: 'flex'}}>
                {/* <AvatarMenu /> */}
                </div>
           
        </Navbar>
    );
  }
}

export default Navbarmain;



