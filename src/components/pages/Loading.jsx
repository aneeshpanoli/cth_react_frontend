import React from "react";
import {
  Container,
  Box
} from "@material-ui/core"
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTrackedState } from "reactive-react-redux";
import { useHistory } from "react-router-dom";

export default function Loading() {
  const history = useHistory();
  const { authData } = useTrackedState();
  React.useEffect(() => {
    if (authData.isAuthenticated) {
      // if redirected from cth go back after login otherwise go to home page
      history && document.referrer.includes(window.location.hostname)
        ? history.goBack()
        : history.push("/");
    }
  }, [authData]);

  return (
    <Box >
      <Container>
      <CircularProgress />

      </Container>
      
    </Box>
  );
}

