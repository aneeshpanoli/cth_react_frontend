import React, { useEffect, useState, useRef } from "react";
import Head from "../meta/Head";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import throttle from "lodash.throttle";
import { queryElasticsearch, esAxios } from "../backend/AxiosRequest";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { MATCH } from "../backend/EsQueries";
import InputAdornment from '@material-ui/core/InputAdornment';

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
  const [newSearchValue, setNewSearchValue] = useState("@");
  React.useEffect(() => setNewSearchValue(params.query), [params]);

  const query = (numResults, match) => {
    return {
      params: {
        index: "projects",
        q: {
          size: numResults,
          query: {
            multi_match: match,
          },
        },
      },
    };
  };
  const queryDatabase = (searchValue, numResults) => {
    if (searchValue && searchValue.length > 1) {
      dispatch(updateProgress(true));
      // send to axios

      queryElasticsearch(
        searchValue,
        query(numResults, {
          query: searchValue,
          // type: "phrase",
          fields: ["title^4.0", "storyText"],
        }),
        dispatch,
        updateProjectList,
        props.redirect
      );
      setSearchValue("");
    }
  };

  const querySuggest = (searchValue) => {
    esAxios
      .get(`/q/`, {
        params: {
          index: "search_as_you_type",
          _source: ["title"],
          q: {
            query: {
              multi_match: {
                query: searchValue,
                type: "bool_prefix",
                fields: [
                  "title",
                  "title._2gram",
                  "title._3gram",
                  "storyText",
                  "storyText._2gram",
                  "storyText._3gram",
                ],
              },
            },
          },
        },
      })
      .then((response) => {
        console.log(response.data.hits.hits);
        // console.log(response.data.suggest.suggestB[0].options);
        // console.log(response.data.suggest.suggestA[0].options);
        // let suggestions = response.data.suggest.simple_phrase1[0].options.concat(
        //   response.data.suggest.simple_phrase2[0].options);
        let suggestions = response.data.hits.hits;

        if (suggestions.length > 0) {
          setCategories([...new Set(suggestions.map((a) => a._source.title))]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const throttled = useRef(
    throttle((newValue) => queryDatabase(newValue, 1000), 1000)
  );

  const throttledSuggest = useRef(
    throttle((newValue) => querySuggest(newValue), 500)
  );
  const throttledQuickQuery = useRef(
    throttle((newValue) => queryDatabase(newValue, 1000), 500)
  );

  // use setNewSearchValue to update the searchstring when the enter is pressed
  // control the queryDatabase callback as the newSearchValue changes
  useEffect(() => {
    if (newSearchValue != "@") throttled.current(newSearchValue);
  }, [newSearchValue]);
  useEffect(() => setProgress(isProgress), [isProgress]);

  const enterKeyPressedHandler = (value) => {
    if (value) {
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
    if (value) {
      throttledSuggest.current(value);
      // throttledQuickQuery.current(value);
      setSearchValue(value);
    }
  };

  return (
    <MuiThemeProvider>
      <React.Fragment>
        <Head
          title={
            params.query
              ? params.query + " - Search results- CivicTechHub"
              : null
          }
          description={"List of projects"}
        />
        <Autocomplete
          style={props.style}
          freeSolo
          autoComplete
          id="combo-box-demo"
          forcePopupIcon={false}
          options={categories}
          filterOptions={(options, state) => options}
          getOptionLabel={(option) => (option.text ? option.text : option)}
          onChange={(e, value) => {
            enterKeyPressedHandler(value && value.text ? value.text : value);
          }}
          onInputChange={(e) => {
            handleOnchange(e.target.value);
          }}
          renderInput={(params) => (
            <TextField {...params} 
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{color:'grey'}}/>
                </InputAdornment>
              )
            }}
            label="Search projects" variant="outlined" />
          )}
        />

        {progress ? <ProgressBar /> : null}
        <br />
      </React.Fragment>
    </MuiThemeProvider>
  );
}
