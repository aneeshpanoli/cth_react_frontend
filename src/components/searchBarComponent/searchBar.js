import React, { useEffect, useState, useRef } from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import throttle from 'lodash.throttle';
import { searchRecipeTitle } from '../data/axiosComponent'
import { useDispatch } from 'reactive-react-redux';


export default function searchBar (){
    const dispatch = useDispatch()
    const queryDatabase = searchValue => {
        if (searchValue.length > 1){ 
            // send to axios
            searchRecipeTitle(searchValue, 'title', dispatch);

            // // slide the results panel back in if it had slid off view
            // dispatch(updateSlideSearchResults(true));
        }
       }
        
    const [searchValue, setSearchValue] = useState("");
    const [newSearchValue, setNewSearchValue] = useState("");
    
    
    const throttled = useRef(throttle((newValue) => queryDatabase(newValue), 1500))

    // use setNewSearchValue to update the searchstring when the enter is pressed
    // control the queryDatabase callback as the newSearchValue changes
    useEffect(() => throttled.current(newSearchValue), [newSearchValue])
  
    

       const enterKeyPressedHandler = event => {
        
        if (event.keyCode === 13 || event.key === 'Enter' || event.charCode === 13) {
            setNewSearchValue(searchValue);
        }
    }
      
        return (
            <MuiThemeProvider>
                <SearchBar
                onChange={(value) => setSearchValue(value)}
                onRequestSearch={() => setNewSearchValue(searchValue)}
                onKeyDown={(e) => enterKeyPressedHandler(e)}
                style={{
                margin: '0 auto',
                maxWidth: 800,
                marginTop: "20%"
                }}
                />
            </MuiThemeProvider>
        );
    }


