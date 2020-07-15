import React from 'react';
import Footer from '../footer/Footer'
import TopNav from '../navigation/TopNav'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import Container from '@material-ui/core/Container';
import ChallengeForm from '../createChallenge/ChallengeForm'
import { useHistory } from 'react-router-dom';



export default function AboutUs (){
    const history = useHistory();
    const { authData } = useTrackedState();
    React.useEffect(() => {
        if (!authData.isAuthenticated){
            history.push('/');
        }
       });

    return (
        <Container style={{minHeight: '100vh'}}>
        <TopNav />
        <div>
            <h2>Page not found!</h2>
        </div>
        <Footer />

        </Container>
    );
}