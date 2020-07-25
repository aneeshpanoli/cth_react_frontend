import React from 'react';
import Footer from '../footer/Footer'
import DashBoard from '../dashBoard/DashBoard'
import TopNav from '../navigation/TopNav'
import { queryElasticsearch } from '../backend/AxiosRequest'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { updateProjectList } from '../redux/actions'
import Container from '@material-ui/core/Container';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { Canvas } from  '../ExploreProjects/Canvas'



export default function SearchProjects (){
    const dispatch = useDispatch();
    const history = useHistory();
    // const { authData } = useTrackedState();
    // React.useEffect(() => {
    //     if (!authData.isAuthenticated){
    //         history.push('/');
    //     }
    //    });
    
    return (
        <React.Fragment>
        <TopNav />
        <DashBoard />
        <Footer />
        </React.Fragment>
    );
}