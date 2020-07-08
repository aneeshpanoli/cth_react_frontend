import React from 'react';

//components

import Footer from '../footer/Footer'
import Hero from '../heroComponent/Hero'
import SearchResults from '../search/SearchHomeResults'
import Navbar from '../navigation/TopNav'
import { queryElasticsearch } from '../backend/AxiosRequest'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { updateProjectList } from '../redux/actions'
import { useDispatch } from 'reactive-react-redux';
import { Circle } from '../d3/AnimatedCircles'




export default function homePage (){
    const dispatch = useDispatch();
    React.useEffect(()=>{
        let query = FETCH_RANDOM_ON_SESSION("1477072619038");
        queryElasticsearch("1477072619038", query, dispatch, updateProjectList);
    }, [])
   
    return (
        <div>
        <Navbar />
        <Hero />
        {/* <Circle /> */}
        <SearchResults />
        <Footer />
        </div>
    );
}