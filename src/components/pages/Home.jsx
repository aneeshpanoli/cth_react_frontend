import React from "react";
import Hero from "../home/Hero";
import Navbar from "../navigation/TopNav";
import Head from '../meta/Head'
import Activity from '../home/Activity'
import { useDispatch } from "reactive-react-redux";
import { useTrackedState } from "reactive-react-redux";

// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const FeaturedProjects = lazy(() => import('../home/FeaturedProjects'));
const Footer = lazy(() => import('../footer/Footer'));


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
      <LazyLoad>
        <FeaturedProjects />
      </LazyLoad>
      <LazyLoad><Footer /></LazyLoad>
      
    </React.Fragment>
  );
}


