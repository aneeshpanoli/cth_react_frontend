import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'


class Navbarmain extends Component {
  render() {
    return (
        
        <Navbar className="border-bottom border-dark mb-3" bg="white" variant="light" sticky="top">
                <Navbar.Brand href="#home">
                    <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    Homechef.ai
                </Navbar.Brand>
        </Navbar>
    );
  }
}

export default Navbarmain;



