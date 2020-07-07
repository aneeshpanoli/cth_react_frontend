import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useTrackedState } from 'reactive-react-redux';

export default function ProgresBar() {
    // const [isLoading, setIsLoading] = React.useState(false);
    const { isProgress } = useTrackedState();
    // React.useEffect(()=>setIsLoading(isProgress), [isProgress]);
  if (isProgress) {
    return (
      <LinearProgress
        style={{
          margin: "0 auto",
          maxWidth: 800,
          width: "100%",
        }}
      />
    );
  } else {
    return null;
  }
}
