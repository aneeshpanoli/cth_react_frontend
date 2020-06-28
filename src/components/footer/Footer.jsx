import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import FooterGrid from './FooterGrid'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Onexome.com { }
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer () {
    return (
        <Box>
        <Container>
        <Divider light />

          <h1 style={{color:'grey'}}>Civic Tech Hub</h1>
          <Divider light />
            <FooterGrid />
            <Divider light />
            <Copyright />
        </Container>
      </Box>
    );
  }


