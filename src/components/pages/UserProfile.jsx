import React from "react";
import Footer from "../footer/Footer";
import TopNav from "../navigation/TopNav";
import UserMain from "../userProfile/UserMain";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function UserProfile() {
  return (
    <Box>
      <TopNav />
      <Container>
        <UserMain />
      </Container>
      <Footer />
    </Box>
  );
}
