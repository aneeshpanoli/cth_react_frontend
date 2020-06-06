import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import FooterGrid from './footerGrid'

export default function Footer () {
    return (
        <Jumbotron fluid>
        <Container>
          <h1>Civic Tech Hub</h1>
          <hr></hr>
            <FooterGrid />
          <hr></hr>
        </Container>
      </Jumbotron>
    );
  }


