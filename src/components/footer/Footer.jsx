import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import FooterGrid from './FooterGrid'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Civic Tech Hub { }
      {new Date().getFullYear()}
      {' '} {props.children}
    </Typography>
  );
}

export default function Footer () {
  const history = useHistory();
  const handleTerms = (selectedProject) => {
    history.push("/terms-and-conditions");
  };
  const handleClick= (page) => {
    history.push(page);
  };

    return (
        <Box>
        <Container>
        <Divider light />

          <h1 style={{color:'grey'}}>Civic Tech Hub</h1>
          <Divider light />
            <FooterGrid />
            <Divider light />
            <Copyright>
            
            | <Button size="small" onClick={() => handleClick("/privacy-policy")}>Privacy Policy</Button> | 
            <Button size="small" onClick={() => handleClick("/terms-and-conditions")}>Terms and conditions</Button>
              </Copyright> 
        </Container>
      </Box>
    );
  }

