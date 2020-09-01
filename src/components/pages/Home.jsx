import React from "react";
import Footer from "../footer/Footer";
import Hero from "../home/Hero";
import Navbar from "../navigation/TopNav";
import Head from '../meta/Head'
import Activity from '../home/Activity'
import { useDispatch } from "reactive-react-redux";
import CarouselHolder from "../home/FeaturedProjects";
import { useTrackedState } from "reactive-react-redux";

export default function homePage() {
  const dispatch = useDispatch();
  const { authData } = useTrackedState();

  // React.useEffect(() => {
  //   if (!searchProjectList) {
  //     let query = FETCH_RANDOM_ON_SESSION();
  //     queryElasticsearch("", query, dispatch, updateProjectList, 'home');
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Head />
      <Navbar />
      {authData.isAuthenticated?<Activity />:
      <Hero />}
      <CarouselHolder />
      <Footer />
    </React.Fragment>
  );
}

