import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useTrackedState } from 'reactive-react-redux';

export default function ProgresBar() {
    // const [isLoading, setIsLoading] = React.useState(false);
    const { isProgress } = useTrackedState();
    // React.useEffect(()=>setIsLoading(isProgress), [isProgress]);
    return (
      <LinearProgress
        style={{
          margin: "0 auto",
          maxWidth: 775,
          width: "100%",
        }}
      />
    );
}
