import React from 'react';

//components

import Footer from '../footerComponent/footer'
import Hero from '../heroComponent/hero'
import SearchResults from './searchResults'
import Navbar from './navbarComponent'



export default function homePage (){
    return (
        <div>
        <Navbar />
        <Hero />
        <SearchResults />
        <Footer />
        </div>
    );
}