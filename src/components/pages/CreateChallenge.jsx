import React from 'react';
import Footer from '../footer/Footer'
import TopNav from '../navigation/TopNav'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import Container from '@material-ui/core/Container';
import ChallengeForm from '../create/ChallengeForm'
import { useHistory } from 'react-router-dom';



export default function homePage (){
    const history = useHistory();
    const dispatch = useDispatch();
    let query = FETCH_RANDOM_ON_SESSION("1477072619038");
    const { authData } = useTrackedState();
    React.useEffect(() => {
        if (!authData.isAuthenticated){
            history.push('/');
        }
       });
    // React.useEffect(() => {
    //     queryElasticsearch(query, dispatch, updateProjectList);
    // }, []);
    
    return (
        <Container style={{minHeight: '100vh'}}>
        <TopNav />
        <ChallengeForm />
        <Footer />

        </Container>
    );
}