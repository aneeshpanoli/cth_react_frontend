import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import FooterGrid from './FooterGrid'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import footerLogo from '../../Assets/img/cth_footer.svg'

function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        CivicTechHub { }
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
        <Box style={{backgroundColor:'silver', borderTop:'5px solid #061F71'}}>
        <Container>
{/* 
          <h1 style={{color:'black', fontWeight:700}}>Civic Tech Hub</h1>
          <h6 style={{color:'grey', fontWeight:700}}>Together we can survive this crisis</h6> */}
          <img src={footerLogo} style={{ height:'3rem', marginTop:'1rem', color:'red'}}/> 
          <Divider light />
            <FooterGrid />
            <Divider variant="middle" />
            <Copyright>
            
            | <Button size="small" style={{textTransform: "none"}} 
            onClick={() => handleClick("/privacy-policy")}>Privacy Policy</Button> | 
            <Button size="small" style={{textTransform: "none"}} 
            onClick={() => handleClick("/terms-and-conditions")}>Terms & conditions</Button>
              </Copyright> 
        </Container>
      </Box>
    );
  }


