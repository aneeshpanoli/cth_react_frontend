import React from 'react';

//components

import Footer from '../footer/Footer'
import Hero from '../home/Hero'
import SearchResults from '../search/SearchHomeResults'
import Navbar from '../navigation/TopNav'
import { queryElasticsearch } from '../backend/AxiosRequest'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { updateProjectList } from '../redux/actions'
import { useDispatch } from 'reactive-react-redux';
import { Circle } from '../d3/AnimatedCircles'
import { useTrackedState } from 'reactive-react-redux';





export default function homePage (){
    const dispatch = useDispatch();
    const { searchProjectList } = useTrackedState();
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    React.useEffect(() => {
        if(!searchProjectList){
        let query = FETCH_RANDOM_ON_SESSION();
        queryElasticsearch("", query, dispatch, updateProjectList);
        }
    }, []);
   
    return (
        <React.Fragment>
        <Navbar />
        <Hero />
        <SearchResults />
        <Footer />
        </React.Fragment>
    );
}