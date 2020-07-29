import React from "react";
import Footer from "../footer/Footer";
import TopNav from "../navigation/TopNav";
import Container from "@material-ui/core/Container";
import FeedbackForm from "../footer/FeedbackForm";
import Box from "@material-ui/core/Box";

export default function Feedback() {
  return (
    <Box>
      <TopNav />
      <Container>
        <FeedbackForm />
      </Container>
      <Footer />
    </Box>
  );
}
