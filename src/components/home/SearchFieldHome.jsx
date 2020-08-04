import React, { useEffect, useState, useRef } from "react";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import throttle from "lodash.throttle";
import { queryElasticsearch } from "../backend/AxiosRequest";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { MATCH } from "../backend/EsQueries";
import { updateProjectList, updateProgress } from "../redux/actions";
import ProgressBar from "../search/ProgressBar";
import LinearProgress from "@material-ui/core/LinearProgress";


export default function SearchField(props) {
  const dispatch = useDispatch();
  const { isProgress } = useTrackedState();
  const [progress, setProgress] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newSearchValue, setNewSearchValue] = useState("");
  const queryDatabase = (searchValue) => {

    if (searchValue&&searchValue.length > 1) {
      dispatch(updateProgress(true));
      // send to axios
      let query = MATCH(searchValue, "storyText");
      queryElasticsearch(searchValue, query, dispatch, updateProjectList, props.redirect);
      setSearchValue("");
    }
  };

  const throttled = useRef(
    throttle((newValue) => queryDatabase(newValue), 1500)
  );

  // use setNewSearchValue to update the searchstring when the enter is pressed
  // control the queryDatabase callback as the newSearchValue changes
  useEffect(() => throttled.current(newSearchValue), [newSearchValue]);
  useEffect(() => setProgress(isProgress), [isProgress]);
  useEffect(() => setProgress(false), []);

  const enterKeyPressedHandler = (event) => {
    if (
      event.keyCode === 13 ||
      event.key === "Enter" ||
      event.charCode === 13
    ) {
      setNewSearchValue(searchValue);
    }
  };

  return (
    <MuiThemeProvider>
      <React.Fragment>
        <SearchBar
          onChange={(value) => setSearchValue(value)}
          onRequestSearch={() => setNewSearchValue(searchValue)}
          onKeyDown={(e) => enterKeyPressedHandler(e)}
          hintText="Search projects..."
          spellCheck={true}
          style={{
            maxWidth: 500,
            width: "95%",
            border: "1px solid #061F71",
            borderRadius: 15,
          }}
        />
        {progress ?<LinearProgress
        style={{
          marginLeft:9 ,
          maxWidth: 480,
          width: "90%",
          marginBottom: '2rem'
        }}
      /> : null}
      </React.Fragment>
    </MuiThemeProvider>
  );
}
