import React from "react";
import Footer from "../footer/Footer";
import TandC from "../footer/Terms";
import TopNav from "../navigation/TopNav";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

export default function TermsConditions() {
  return (
    <Box>
      <TopNav />
      <Container>
        <TandC />
      </Container>
      <Footer />
    </Box>
  );
}
