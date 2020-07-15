import React from 'react';
import Footer from '../footer/Footer'
import TopNav from '../navigation/TopNav'
import Container from '@material-ui/core/Container';
import FeedbackForm from '../footer/FeedbackForm'


export default function AboutUs (){

    return (
        <Container style={{minHeight: '100vh'}}>
        <TopNav />
        <FeedbackForm />
        <Footer />

        </Container>
    );
}