import React from "react";

import TopNav from "../navigation/TopNav";

// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const DashBoard = lazy(() => import('../dashBoard/DashBoard'));
const Footer = lazy(() => import('../footer/Footer'));
export default function ProjectDashboard() {
  return (
    <React.Fragment>
      <TopNav />
      <LazyLoad><DashBoard /></LazyLoad>
      
      <LazyLoad> <Footer /></LazyLoad>
     
    </React.Fragment>
  );
}
