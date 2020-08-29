import React from "react";
import Footer from "../footer/Footer";
import TopNav from "../navigation/TopNav";
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";
import AboutusMain from '../about/AboutUsMain'

export default function AboutUs() {
  return (
    <Box>
      <TopNav />
      <Container>
      <AboutusMain />
      </Container>
      <Footer />
    </Box>
  );
}
