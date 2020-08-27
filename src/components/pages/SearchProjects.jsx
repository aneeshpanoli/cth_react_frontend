import React, { useRef } from "react";
import Footer from "../footer/Footer";
import SearchPageResults from "../search/SearchResults";
import TopNav from "../navigation/TopNav";
import Box from "@material-ui/core/Box";
import SearchField from "../search/SearchField";

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
      <SearchField style={{
            margin: "0 auto",
            maxWidth: 800,
            width: "100%",
            // border: "1px solid #061F71",
            marginTop: "1rem",
          }} 
          
          progressStyle={{
            margin: "0 auto",
            maxWidth: 777,
            width: "100%",
          }}/>
      <SearchPageResults />
      <Footer />
    </Box>
  );
}
