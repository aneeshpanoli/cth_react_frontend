import React from "react";
import Footer from "../footer/Footer";
import { useHistory } from "react-router-dom";
import TopNav from "../navigation/TopNav";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { useTrackedState } from "reactive-react-redux";
import PwdResetForm from "../auth/PwdResetForm";


export default function UserProfile() {
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
    <Box>
      <TopNav />
      <Container>
      <PwdResetForm />
      </Container>
      <Footer />
    </Box>
  );
}

