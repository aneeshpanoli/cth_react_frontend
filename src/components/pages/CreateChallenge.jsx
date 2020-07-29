import React from "react";
import Footer from "../footer/Footer";
import TopNav from "../navigation/TopNav";
import { useTrackedState } from "reactive-react-redux";
import Container from "@material-ui/core/Container";
import ChallengeForm from "../create/ChallengeForm";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

export default function homePage() {
  const history = useHistory();
  const { authData } = useTrackedState();
  React.useEffect(() => {
    if (!authData.isAuthenticated) {
      history.push("/");
    }
  });

  return (
    <Box>
      <TopNav />
      <Container>
        <ChallengeForm />
      </Container>
      <Footer />
    </Box>
  );
}
