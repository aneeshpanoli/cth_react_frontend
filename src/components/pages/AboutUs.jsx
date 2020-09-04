import React from "react";
import Footer from "../footer/Footer";
import TopNav from "../navigation/TopNav";
import Box from '@material-ui/core/Box';
import Container from "@material-ui/core/Container";

// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const AboutusMain = lazy(() => import('../about/AboutUsMain'));

export default function AboutUs() {
  return (
    <Box>
      <TopNav />
      <Container>
     <LazyLoad>
       <AboutusMain />
     </LazyLoad>
      </Container>
      <LazyLoad>
       <Footer />
     </LazyLoad>
    </Box>
  );
}
