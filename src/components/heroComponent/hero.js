import React, { Component } from 'react';
import Searchbar from '../searchBarComponent/searchBar'
import heroimg from '../../Assets/img/hero.jpg'
import Navbar from 'react-bootstrap/Navbar'

class Hero extends Component {


    searchResultCallback = searchRes => {
        console.log(searchRes);
        this.props.resultsCallback(searchRes);
        
    }

  render() {

    return (
    <div className="jumbotron hero-div" style={{backgroundImage: "url(" + heroimg + ")" }} >
        <Navbar bg="none" variant="dark" sticky="top">
            <Navbar.Brand href="#home">
            <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            />{' '}
                Homechef.ai
            </Navbar.Brand>
        </Navbar>
        <Searchbar resultsCallback={this.searchResultCallback}/>
    </div>
    );
  }
}

export default Hero;
