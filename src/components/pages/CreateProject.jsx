import React from "react";
import TopNav from "../navigation/TopNav";
import { useTrackedState } from "reactive-react-redux";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const ProjectForm = lazy(() => import('../create/ProjectSubmitForm'));
const Footer = lazy(() => import('../footer/Footer'));

export default function CreateProject() {
  const history = useHistory();
  const { authData } = useTrackedState();
  React.useEffect(() => {
    if (!authData.isAuthenticated) {
      history.push("/");
    }
  }, [authData]);

  return (
    <Box>
      <TopNav />
      <Container>
        <LazyLoad><ProjectForm /></LazyLoad>
        
      </Container>
      <LazyLoad><Footer /></LazyLoad>
      
    </Box>
  );
}
