import React from 'react';
import Footer from '../footer/Footer'
import { useHistory } from 'react-router-dom';
import TopNav from '../navigation/TopNav'
import UserMain from '../userProfile/UserMain'
import Container from '@material-ui/core/Container';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import SingnIn from '../auth/SignIn'
 


export default function UserProfile (){
    const history = useHistory();
    const dispatch = useDispatch();
    const { authData } = useTrackedState();
    
    React.useEffect(() => {
        if (authData.isAuthenticated){
            history.push('/');
        }
       });

    return (
        <Container style={{minWidth:"100%", backgroundColor:'#ffffff00' }}>
        <TopNav />
        <SingnIn />
        <Footer />
        </Container>
    );
}