import React, { Component } from 'react';
import Searchbar from '../searchBarComponent/searchBar'
import heroimg from '../../Assets/img/hero.jpg'

class Hero extends Component {


    searchResultCallback = searchRes => {
        console.log(searchRes);
        this.props.resultsCallback(searchRes);
        
    }

  render() {

    return (
    <div className="jumbotron hero-div mb-0" style={{backgroundImage: "url(" + heroimg + ")" }} >
        
        <Searchbar resultsCallback={this.searchResultCallback}/>
    </div>
    );
  }
}

export default Hero;
