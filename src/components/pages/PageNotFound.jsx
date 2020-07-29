import React from "react";
import Footer from "../footer/Footer";
import TopNav from "../navigation/TopNav";
import { useTrackedState } from "reactive-react-redux";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

export default function AboutUs() {
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
        <div>
          <h2>Page not found!</h2>
        </div>
      </Container>
      <Footer />
    </Box>
  );
}
