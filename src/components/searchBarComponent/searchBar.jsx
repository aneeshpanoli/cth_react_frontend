import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import throttle from 'lodash.throttle';

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

    state = {
        just_searched: ""
    }
  
    makeRequest = searchValue =>{
        axios.get('http://localhost:8000/api', {
            'params': {
                'q':{
                    'query':{
                        'match_phrase_prefix':{
                            'title': searchValue
                        }
                    }
                }
            }
        })
         .then(response => {
            // process response.
            
            // this.setState({results: response});
            // console.log(response.data);
            this.props.resultsCallback(response);
            
         })
         .catch(e => {
            // catch errors.
            console.log(e);
            this.errors.push(e)
         })
    }
    queryDatabase = searchValue => {
        //request only IF the search value has changed
        if (searchValue.length > 1 && searchValue !== this.state.just_searched){
            this.makeRequest(searchValue);
            this.setState({just_searched: searchValue});
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
