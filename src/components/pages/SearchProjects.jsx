import React, { useRef } from "react";
import Footer from "../footer/Footer";
import SearchPageResults from "../search/SearchResults";
import TopNav from "../navigation/TopNav";
import { queryElasticsearch } from "../backend/AxiosRequest";
import { FETCH_RANDOM_ON_SESSION } from "../backend/EsQueries";
import { updateProjectList } from "../redux/actions";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import Box from "@material-ui/core/Box";
import SearchField from "../search/SearchField";

export default function SearchProjects() {
  const dispatch = useDispatch();
  const { searchProjectList} = useTrackedState();
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
      <SearchField marginTop="0.5rem" />
      <SearchPageResults />
      <Footer />
    </Box>
  );
}
