import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import AvatarMenu from '../navigaton/avatarMenu';
import cthLogo from '../../Assets/img/cth.svg'
import Typography from '@material-ui/core/Typography';


export default function Navbarmain() {
    return (
        <Navbar className="pr-5 mt-3 pl-5" bg="white" variant="light" sticky="top">
                <Navbar.Brand href="#">
                    <img
                    alt="logo"
                    src={cthLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                    <p id="logo-text" > 
                    Civic Tech Hub
                    </p>
                    
                </Navbar.Brand>
                <div style={{position: 'absolute', right: 20, display: 'flex', flea:"top"}}>
                
                <AvatarMenu/>
                </div>
           
        </Navbar>
    );
  }





