import React, { useEffect, useState, useRef } from "react";
import Head from "../meta/Head";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import throttle from "lodash.throttle";
import { queryElasticsearch, esAxios } from "../backend/AxiosRequest";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { MATCH } from "../backend/EsQueries";
import { updateProjectList, updateProgress } from "../redux/actions";
import ProgressBar from "./ProgressBar";
import { useParams, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchField(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const [categories, setCategories] = React.useState([]);
  const { isProgress } = useTrackedState();
  const [progress, setProgress] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newSearchValue, setNewSearchValue] = useState('@');
  React.useEffect(()=>setNewSearchValue(params.query), [params])
  const queryDatabase = (searchValue) => {
    if (searchValue.length > 1) {
      dispatch(updateProgress(true));
      // send to axios
      let query = MATCH(searchValue, "storyText", 1000);
      queryElasticsearch(
        searchValue,
        query,
        dispatch,
        updateProjectList,
        props.redirect
      );
      setSearchValue("");
    }
  };

  const querySuggest = (searchValue) => {
    esAxios
      .get(
        `/q/`,
          {params: {
            index: "projects",
            q: {
              suggest: {
                text: searchValue,
                suggestA: {
                  term: {
                    field: "subtitle",
                  },
                },
                suggestB: {
                  term: {
                    field: "storyText",
                  },
                },
              },
            },
          },
        }
        
      )
      .then((response) => {
        console.log(response.data.suggest.suggestB);
        console.log(response.data.suggest.suggestB[0].options);
        console.log(response.data.suggest.suggestA[0].options);
        let suggestions = response.data.suggest.suggestB[0].options.concat(
          response.data.suggest.suggestA[0].options
        );
        if (suggestions.length > 0) {
          setCategories(suggestions);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const throttled = useRef(
    throttle((newValue) => queryDatabase(newValue), 1000)
  );

  const throttledSuggest = useRef(
    throttle((newValue) => querySuggest(newValue), 1000)
  );

  // use setNewSearchValue to update the searchstring when the enter is pressed
  // control the queryDatabase callback as the newSearchValue changes
  useEffect(() => {
    if (newSearchValue != "@") throttled.current(newSearchValue);
  }, [newSearchValue]);
  useEffect(() => setProgress(isProgress), [isProgress]);

  const enterKeyPressedHandler = (value) => {
    if(value){
      history.push("/search/" + value);
    }
    
    // if (
    //   event.keyCode === 13 ||
    //   event.key === "Enter" ||
    //   event.charCode === 13
    // ) {
    //   // setNewSearchValue(searchValue);
    //   history.push("/search/" + searchValue);
    // }
  };

  const handleOnchange = (value) => {
    if(value){
      throttledSuggest.current(value);
      setSearchValue(value);
    }
    
  };

  return (

    <MuiThemeProvider>
       <Head
        title={
          params.query?params.query+ " - Search results- CivicTechHub" : null
        }
        description={
          "List of projects"
        }
        image={null}
      />
      <React.Fragment>
        <Autocomplete
          style={{
            margin: "0 auto",
            maxWidth: 800,
            width: "100%",
            // border: "1px solid #061F71",
            borderRadius: 15,
            marginTop: props.marginTop,
          }}
          freeSolo
          autoComplete
          id="combo-box-demo"
          forcePopupIcon={false}
          closeIcon={<SearchIcon />}
          options={categories}
          getOptionLabel={option => option.text?option.text:option}
          fullWidth
          onChange={(e, value) => {
            enterKeyPressedHandler(value&&value.text?value.text:value);
          }}
          onInputChange={(e) => {
            handleOnchange(e.target.value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search projects" variant="outlined" />
          )}
        />
        {/* <SearchBar
          onChange={(value) => handleOnchange(value)}
          onRequestSearch={() => setNewSearchValue(searchValue)}
          onKeyDown={(e) => enterKeyPressedHandler(e)}
          hintText="Search projects"
          spellCheck={true}
          style={{
            margin: "0 auto",
            maxWidth: 800,
            width: "100%",
            border: "1px solid #061F71",
            borderRadius: 15,
            marginTop: props.marginTop,
          }}
        >
          
        </SearchBar>
         */}
        {progress ? <ProgressBar /> : null}
        <br />
      </React.Fragment>
    </MuiThemeProvider>
  );
}
