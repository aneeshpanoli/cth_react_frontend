import React from 'react';
import Footer from '../footer/Footer'
import { useHistory } from 'react-router-dom';
import TopNav from '../navigation/TopNav'
import UserMain from '../userProfile/UserMain'
import Container from '@material-ui/core/Container';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import Box from '@material-ui/core/Box';
 


export default function UserProfile (){
    const history = useHistory();
    const dispatch = useDispatch();
    const { authData } = useTrackedState();
    
    React.useEffect(() => {
        if (!authData.isAuthenticated){
            history.push('/');
        }
       });

    return (
        <Box>
        <TopNav />
        <Container>
        <UserMain />
        </Container>
        <Footer />
        </Box>
    );
}