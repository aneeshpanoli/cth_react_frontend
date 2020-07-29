import React from "react";
import Footer from "../footer/Footer";
import TopNav from "../navigation/TopNav";
import { useTrackedState } from "reactive-react-redux";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import ProjectEditForm from "../create/ProjectEditForm";
import Box from "@material-ui/core/Box";

export default function EditProject() {
  const history = useHistory();
  const { authData } = useTrackedState();
  React.useEffect(() => {
    // console.log(authData)
    if (!authData.user) {
      history.push("/");
    }
  }, [authData]);

  return (
    <Box>
      <TopNav />
      <Container>
        <ProjectEditForm />
      </Container>
      <Footer />
    </Box>
  );
}
