import React from 'react';
import Footer from '../footer/Footer'
import TopNav from '../navigation/TopNav'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import Container from '@material-ui/core/Container';
import ProjectForm from '../create/ProjectForm'
import { useHistory } from 'react-router-dom';
import ProjectEditForm from '../create/ProjectEditForm'



export default function homePage (){
    const history = useHistory();
    const { authData } = useTrackedState();
    React.useEffect(() => {
        // console.log(authData)
        if (!authData.user){
            history.push('/');
        }
       }, [authData]);
    
    return (
        <Container style={{minHeight: '100vh'}}>
        <TopNav />
        <ProjectEditForm />
        <Footer />

        </Container>
    );
}
