import React from "react";
import Footer from "../footer/Footer";
import TopNav from "../navigation/TopNav";
import { useTrackedState } from "reactive-react-redux";
import Container from "@material-ui/core/Container";
import ProjectForm from "../create/ProjectSubmitForm";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";

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
        <ProjectForm />
      </Container>
      <Footer />
    </Box>
  );
}
