import React from 'react';
import Footer from '../footer/Footer'
import TopNav from '../navigation/TopNav'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import Container from '@material-ui/core/Container';
import ProjectForm from '../create/ProjectForm'
import { useHistory } from 'react-router-dom';



export default function homePage (){
    const history = useHistory();
    const { authData } = useTrackedState();
    React.useEffect(() => {
        console.log(authData)
        if (!authData.isAuthenticated){
            // history.push('/');
        }
       }, [authData]);
    
    return (
        <Container style={{minHeight: '100vh'}}>
        <TopNav />
        <ProjectForm />
        <Footer />

        </Container>
    );
}
