import React, { useEffect, useState, useRef } from "react";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import throttle from "lodash.throttle";
import { queryElasticsearch } from "../backend/AxiosRequest";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { MATCH } from "../backend/EsQueries";
import { updateProjectList, updateProgress } from "../redux/actions";
import ProgressBar from "./ProgressBar";

export default function searchBar(props) {
  const dispatch = useDispatch();
  const { isProgress } = useTrackedState();
  const [progress, setProgress] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newSearchValue, setNewSearchValue] = useState("");
  const queryDatabase = (searchValue) => {
    if (searchValue.length > 1) {
      dispatch(updateProgress(true));
      // send to axios
      let query = MATCH(searchValue, "storyText");
      queryElasticsearch(searchValue, query, dispatch, updateProjectList, null);
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
          autoFocus
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
