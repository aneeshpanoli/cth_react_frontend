import React, { Component, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import throttle from 'lodash.throttle';
import { searchRecipeTitle } from '../data/axiosComponent'

import { updateSlideSearchResults } from '../redux/actions'
import { useDispatch, useTrackedState } from 'reactive-react-redux';





class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.queryDatabase = this.queryDatabase.bind(this);
        this.queryDatabaseThrottled = throttle(this.queryDatabase, 2000);
      }
    
    componentWillUnmount() {
    this.queryDatabaseThrottled.cancel();
    // https://reactjs.org/docs/faq-functions.html
    }
  
    queryDatabase = searchValue => {
        //request only IF the search value has changed
        if (searchValue.length > 1){ 
            // const [dispatch] = useDispatch()
            searchRecipeTitle(searchValue, 'title', this.props.resultsCallback);
            // dispatch(updateSlideSearchResults(false));
        }
       }

    render() {
        return (
            <MuiThemeProvider>
                <SearchBar
                onChange={(value) => this.setState({ searchValue: value })}
                onRequestSearch={() => this.queryDatabaseThrottled(this.state.searchValue)}
                style={{
                margin: '0 auto',
                maxWidth: 800,
                marginTop: "20%"
                }}
                />
            </MuiThemeProvider>
        );
    }
}

export default Searchbar;
