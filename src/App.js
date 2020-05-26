import React, { Component } from 'react';


//components

import Footer from './components/footerComponent/footer'
import Hero from './components/heroComponent/hero'
import SearchResults from './components/content/searchResults'
import { Provider } from 'reactive-react-redux';
import store from './components/redux/store'


//stylesheet
import 'bootstrap/dist/css/bootstrap.css'
import './Assets/css/style.css'


const App = () => {
  return (
      <Provider store={store}>
      <div className="App">  
        <Hero />
        <SearchResults />
        <Footer />
      </div>
      </Provider>
    );
  }

export default App;
