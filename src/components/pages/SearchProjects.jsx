import React from 'react';
import Footer from '../footer/Footer'
import SearchResults from '../search/searchResults'
import TopNav from '../navigation/TopNav'
import { queryElasticsearch } from '../backend/AxiosRequest'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { updateProjectList } from '../redux/actions'
import Container from '@material-ui/core/Container';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Searchbar from '../search/SearchBar';




export default function SearchProjects (){
    const dispatch = useDispatch();
    const history = useHistory();
    // const { authData } = useTrackedState();
    // React.useEffect(() => {
    //     if (!authData.isAuthenticated){
    //         history.push('/');
    //     }
    //    });
    
    React.useEffect(() => {
        let query = FETCH_RANDOM_ON_SESSION("1477072619038");
        queryElasticsearch(query, dispatch, updateProjectList);
    }, []);
    
    return (
        <Box width={1} display='flex' flexDirection='column'>
        <TopNav />
        <Searchbar marginTop="0%"/>
        <SearchResults />
        <Footer />
        </Box>
    );
}