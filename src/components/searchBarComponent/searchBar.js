import React, { useEffect, useState, useRef } from 'react';
import SearchBar from 'material-ui-search-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import throttle from 'lodash.throttle';
import { queryElasticsearch } from '../data/axiosComponent'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { MATCH_PHRASE_PREFIX } from '../data/EsQueries'
import { updateProjectList } from '../redux/actions'
import LinearProgress from '@material-ui/core/LinearProgress';



export default function searchBar (){
    const dispatch = useDispatch()
    const { searchProjectList } = useTrackedState();
    const queryDatabase = searchValue => {
        if (searchValue.length > 1){ 
            // send to axios
            let query = MATCH_PHRASE_PREFIX(searchValue, 'title');
            queryElasticsearch(query, dispatch, updateProjectList);
            setSearchValue("");
        }
       }
        
    const [searchValue, setSearchValue] = useState("");
    const [newSearchValue, setNewSearchValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    
    
    const throttled = useRef(throttle((newValue) => queryDatabase(newValue), 1500))

    // use setNewSearchValue to update the searchstring when the enter is pressed
    // control the queryDatabase callback as the newSearchValue changes
    useEffect(() => throttled.current(newSearchValue), [newSearchValue]);
    useEffect(() =>  setIsSearching(false), [searchProjectList]);
  
    

       const enterKeyPressedHandler = event => {
        
        if (event.keyCode === 13 || event.key === 'Enter' || event.charCode === 13) {
            setNewSearchValue(searchValue);
            setIsSearching(true);
        }
         }


    let progress;
    if (isSearching){
        progress = <LinearProgress style={{
        margin: '0 auto',
        maxWidth: 800,
        }} color="secondary"/>;
    }else{
        progress = <div></div>;
    }
      
        return (
           
            <MuiThemeProvider>
                <SearchBar
                onChange={(value) => setSearchValue(value)}
                onRequestSearch={() => setNewSearchValue(searchValue)}
                onKeyDown={(e) => enterKeyPressedHandler(e)}
                hintText = "Search projects"
                spellCheck = {true}
                style={{
                margin: '0 auto',
                maxWidth: 800,
                marginTop: "30%"
                }}
                />
                {progress}
            </MuiThemeProvider>
            
        );
    }


