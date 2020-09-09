import React from "react";

import TopNav from "../navigation/TopNav";

// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const MTHome = lazy(() => import('../dashBoard/MTHome'));
const Footer = lazy(() => import('../footer/Footer'));
export default function ProjectDashboard() {
  return (
    <React.Fragment>
      <TopNav />
      <LazyLoad><MTHome /></LazyLoad>
      
      <LazyLoad> <Footer /></LazyLoad>
     
    </React.Fragment>
  );
}
