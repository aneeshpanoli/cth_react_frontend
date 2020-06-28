import React, { Component } from 'react';
import Searchbar from '../search/searchBar';
import SearchOptions from '../search/searchOptions';
import heroimg from '../../Assets/img/hero.svg';

export default function Hero (){
    let heroHeight = (window.height > window.width) ? window.innerWidth : window.innerHeight;
    React.useEffect(() => {
    function handleResize() {
        heroHeight = (window.height > window.width) ? window.innerWidth : window.innerHeight;
        console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      window.addEventListener('resize', handleResize)
    }});
    return (
      
    <div className="jumbotron hero-div mt-5 " style={{backgroundImage: "url(" + heroimg + ")", width:{heroHeight}}} >
        <Searchbar marginTop="30%"/>
        {/* <SearchOptions /> */}
    </div>
    );
  }


