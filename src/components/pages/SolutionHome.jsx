import React from "react";
import TopNav from "../navigation/TopNav";

// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const SolutionHome = lazy(() => import('../dashBoard/SolutionHome'));
const Footer = lazy(() => import('../footer/Footer'));
export default function ProjectDashboard() {
  return (
    <React.Fragment>
      <TopNav />
      <LazyLoad> <SolutionHome /></LazyLoad>
      
      <LazyLoad> <Footer /></LazyLoad>
     
    </React.Fragment>
  );
}
