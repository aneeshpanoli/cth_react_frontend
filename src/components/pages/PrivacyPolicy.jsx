import React from "react";
import Footer from "../footer/Footer";
import Privacy from "../footer/Privacy";
import TopNav from "../navigation/TopNav";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function PrivacyPolicy() {
  return (
    <Box>
      <TopNav />
      <Container>
        <Privacy />
      </Container>
      <Footer />
    </Box>
  );
}
