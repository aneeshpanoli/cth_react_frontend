import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function ProgressBar(props) {

    return (
      <LinearProgress
        style={{
          margin: props.margin?props.margin:"0 auto",
          maxWidth: props.maxWidth?props.maxWidth:777,
          width: "100%",
        }}
      />
    );
}
