import React from 'react';
import Footer from '../footer/Footer'
import { useHistory } from 'react-router-dom';
import TopNav from '../navigation/TopNav'
import ClaimFrom from '../userProfile/ClaimForm'
import Container from '@material-ui/core/Container';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import Box from '@material-ui/core/Box';
 


export default function UserProfile (){
    const history = useHistory();
    const dispatch = useDispatch();
    const { authData, selectedProject } = useTrackedState();
    
    React.useEffect(() => {
        if (!authData.isAuthenticated || !selectedProject){
            history.push('/');
        }
       });

    return (
        <Container style={{minWidth:"100%", backgroundColor:'#ffffff00' }}>
        <TopNav />
        <ClaimFrom />
        <Footer />
        </Container>
    );
}