import React from 'react';

//components

import Footer from '../footer/Footer'
import Hero from '../heroComponent/Hero'
import SearchResults from '../search/searchResults'
import Navbar from '../navigation/TopNav'
import { queryElasticsearch } from '../data/axiosComponent'
import { FETCH_RANDOM_ON_SESSION } from '../backend/EsQueries'
import { updateProjectList } from '../redux/actions'
import { useDispatch } from 'reactive-react-redux';
import { Circle } from '../d3/AnimatedCircles'




export default function homePage (){
    const dispatch = useDispatch();
    let query = FETCH_RANDOM_ON_SESSION("1477072619038");
    queryElasticsearch(query, dispatch, updateProjectList);
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