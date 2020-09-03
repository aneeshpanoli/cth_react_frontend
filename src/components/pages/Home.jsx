import React, {lazy, Suspense} from "react";
import Footer from "../footer/Footer";
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import Hero from "../home/Hero";
import Navbar from "../navigation/TopNav";
import Head from '../meta/Head'
import Activity from '../home/Activity'
import { useDispatch } from "reactive-react-redux";
import { useTrackedState } from "reactive-react-redux";
const FeaturedProjects = lazy(() => import('../home/FeaturedProjects'));

export default function HomePage() {
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
     <Hero /> }
      <Suspense fallback={<Grid align='center'><CircularProgress/></Grid>}>
      <FeaturedProjects />
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

