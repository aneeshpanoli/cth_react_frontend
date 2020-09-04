import React from "react";
import TopNav from "../navigation/TopNav";
import { useTrackedState } from "reactive-react-redux";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const ChallengeForm = lazy(() => import('../create/ChallengeForm'));
const Footer = lazy(() => import('../footer/Footer'));

export default function CreateChallenge() {
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
        <LazyLoad>
        <ChallengeForm />
        </LazyLoad>
       
      </Container>
      <LazyLoad>       <Footer />
        </LazyLoad>
    </Box>
  );
}
