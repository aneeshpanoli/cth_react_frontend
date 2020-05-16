import React, { Component } from 'react';


//components

import Footer from './components/footerComponent/footer'
import Hero from './components/heroComponent/hero'
import SearchResults from './components/content/searchResults'

//stylesheet
import 'bootstrap/dist/css/bootstrap.css'
import './Assets/css/style.css'


class App extends Component {

  state = {
    results:[]
  };

  getSearchResultsCallback = searchRes => {
    console.log(searchRes.data.hits);
    this.setState({
      results:searchRes.data.hits
    });
    // callback to fetch results from SearchBar Component
  }

  render() {
    return (
      <div className="App">  
        <Hero resultsCallback={this.getSearchResultsCallback}/>
        <SearchResults searchRes={this.state.results}/>
        <Footer />
      </div>
    );
  }
}

export default App;
