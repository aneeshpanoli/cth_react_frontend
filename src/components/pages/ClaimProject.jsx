import React from 'react';
import { useHistory } from 'react-router-dom';
import TopNav from '../navigation/TopNav'
import Container from '@material-ui/core/Container';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import Box from '@material-ui/core/Box';
 
// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const ClaimFrom = lazy(() => import('../userProfile/ClaimForm'));
const Footer = lazy(() => import('../footer/Footer'));



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
        <Box>
        <TopNav />
        <Container>
            <LazyLoad>        <ClaimFrom />
        </LazyLoad>
        </Container>
        <LazyLoad>       <Footer />
        </LazyLoad>
        
        </Box>
    );
}