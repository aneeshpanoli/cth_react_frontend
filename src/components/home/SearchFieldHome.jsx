import React, { useEffect, useState, useRef } from "react";
import SearchBar from "material-ui-search-bar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { useTrackedState } from "reactive-react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useHistory } from 'react-router-dom'


export default function SearchField(props) {
  const history = useHistory()
  const { isProgress } = useTrackedState();
  const [progress, setProgress] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");
 
  useEffect(() => setProgress(isProgress), [isProgress]);
  useEffect(() => setProgress(false), []);

  const enterKeyPressedHandler = (event) => {
    if (
      event.keyCode === 13 ||
      event.key === "Enter" ||
      event.charCode === 13
    ) {
      history.push("/search/"+searchValue)
    }
  };

  return (
    <MuiThemeProvider>
      <React.Fragment>
        <SearchBar
          onChange={(value) => setSearchValue(value)}
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
