import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function ProgressBar(props) {

    return (
      <LinearProgress
        style={props.style}
      />
    );
}
