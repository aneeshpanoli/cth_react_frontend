import React, { useRef } from "react";

import TopNav from "../navigation/TopNav";
import Box from "@material-ui/core/Box";

// lazyload
import LazyLoad from '../meta/LazyLoad'
import {lazy} from "react";
const SearchPageResults = lazy(() => import('../search/SearchResults'));
const Footer = lazy(() => import('../footer/Footer'));

export default function SearchProjects() {
  const resultDiv = useRef(null);

  React.useEffect(() => {
    // if (!searchProjectList) {
    //   let query = FETCH_RANDOM_ON_SESSION("1477072619038");
    //   queryElasticsearch("1477072619038", query, dispatch, updateProjectList, null);
    // }
    window.scrollTo(0, resultDiv.current.offsetTop);
  }, []);

  return (
    <Box width={1} display="flex" flexDirection="column" ref={resultDiv}>
      <TopNav />
      <LazyLoad><SearchPageResults /></LazyLoad><LazyLoad> <Footer /></LazyLoad>
     
    </Box>
  );
}
