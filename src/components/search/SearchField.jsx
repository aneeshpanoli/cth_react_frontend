import React, { useEffect, useState, useRef } from "react";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import throttle from "lodash.throttle";
import { queryElasticsearch } from "../backend/AxiosRequest";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { MATCH } from "../backend/EsQueries";
import { updateProjectList, updateProgress } from "../redux/actions";
import ProgressBar from "./ProgressBar";
import { useParams, useHistory } from 'react-router-dom'

export default function SearchField(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const { isProgress } = useTrackedState();
  const [progress, setProgress] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newSearchValue, setNewSearchValue] = useState(params.query);
  const queryDatabase = (searchValue) => {
    if (searchValue.length > 1) {
      dispatch(updateProgress(true));
      // send to axios
      let query = MATCH(searchValue, "storyText", 100);
      queryElasticsearch(searchValue, query, dispatch, updateProjectList, props.redirect);
      setSearchValue("");
    }
  };

  const throttled = useRef(
    throttle((newValue) => queryDatabase(newValue), 1500)
  );

  // use setNewSearchValue to update the searchstring when the enter is pressed
  // control the queryDatabase callback as the newSearchValue changes
  useEffect(() => {
    if(newSearchValue != '@')
    throttled.current(newSearchValue)
  }, [newSearchValue]);
  useEffect(() => setProgress(isProgress), [isProgress]);

  const enterKeyPressedHandler = (event) => {
    if (
      event.keyCode === 13 ||
      event.key === "Enter" ||
      event.charCode === 13
    ) {
      // setNewSearchValue(searchValue);
      history.push("/search/"+searchValue)
    }
  };

  return (
    <MuiThemeProvider>
      <React.Fragment>
        <SearchBar
          onChange={(value) => setSearchValue(value)}
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
        />
        {progress ? <ProgressBar /> : null}
      </React.Fragment>
    </MuiThemeProvider>
  );
}
