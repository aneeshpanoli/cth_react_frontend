import React, { useEffect, useState, useRef } from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import throttle from 'lodash.throttle';
import { queryElasticsearch } from '../backend/AxiosRequest'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { MATCH_PHRASE_PREFIX } from '../backend/EsQueries'
import { updateProjectList, updateProgress } from '../redux/actions'
import ProgressBar from './ProgressBar';


export default function searchBar (props){
    const dispatch = useDispatch()
    const queryDatabase = searchValue => {
        if (searchValue.length > 1){ 
            // send to axios
            let query = MATCH_PHRASE_PREFIX(searchValue, 'title');
            queryElasticsearch(searchValue, query, dispatch, updateProjectList);
            setSearchValue("");
        }
       }
        
    const [searchValue, setSearchValue] = useState("");
    const [newSearchValue, setNewSearchValue] = useState("");
    
    
    const throttled = useRef(throttle((newValue) => queryDatabase(newValue), 1500))

    // use setNewSearchValue to update the searchstring when the enter is pressed
    // control the queryDatabase callback as the newSearchValue changes
    useEffect(() => throttled.current(newSearchValue), [newSearchValue]);
  
       const enterKeyPressedHandler = event => {
        
        if (event.keyCode === 13 || event.key === 'Enter' || event.charCode === 13) {
            setNewSearchValue(searchValue);
            
        }
         }
        
      
        return (
           
            <MuiThemeProvider>
                <React.Fragment>
                <SearchBar
                onChange={(value) => setSearchValue(value)}
                onRequestSearch={() => setNewSearchValue(searchValue)}
                onKeyDown={(e) => enterKeyPressedHandler(e)}
                hintText = "Search projects"
                spellCheck = {true}
                style={{
                margin: '0 auto',
                maxWidth: 800,
                width: '100%',
                marginTop: props.marginTop
                }}
                />
                <ProgressBar />
                
                </React.Fragment>
            </MuiThemeProvider>
            
        );
    }


