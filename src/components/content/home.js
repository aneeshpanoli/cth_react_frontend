import React from 'react';

//components

import Footer from '../footerComponent/footer'
import Hero from '../heroComponent/hero'
import SearchResults from './searchResults'



export default function homePage (){
    return (
        <div>
        <Hero />
        <SearchResults />
        <Footer />
        </div>
    );
}