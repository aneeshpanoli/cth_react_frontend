import React from 'react';
import Footer from '../footer/Footer'
import TopNav from '../navigation/TopNav'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';



export default function AboutUs (){

    return (
        <Container style={{minHeight: '100vh'}}>
        <TopNav />
        <Footer />

        </Container>
    );
}