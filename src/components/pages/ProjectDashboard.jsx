import React from "react";
import Footer from "../footer/Footer";
import DashBoard from "../dashBoard/DashBoard";
import TopNav from "../navigation/TopNav";

export default function ProjectDashboard() {
  return (
    <React.Fragment>
      <TopNav />
      <DashBoard />
      <Footer />
    </React.Fragment>
  );
}
