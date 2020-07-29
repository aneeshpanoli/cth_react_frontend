import React from "react";
import Footer from "../footer/Footer";
import Hero from "../home/Hero";
import Navbar from "../navigation/TopNav";
import { queryElasticsearch } from "../backend/AxiosRequest";
import { FETCH_RANDOM_ON_SESSION } from "../backend/EsQueries";
import { updateProjectList } from "../redux/actions";
import { useDispatch } from "reactive-react-redux";
import CarouselHolder from "../search/CarouselHolder";
import { useTrackedState } from "reactive-react-redux";

export default function homePage() {
  const dispatch = useDispatch();
  const { searchProjectList } = useTrackedState();

  React.useEffect(() => {
    if (!searchProjectList) {
      let query = FETCH_RANDOM_ON_SESSION();
      queryElasticsearch("", query, dispatch, updateProjectList);
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <CarouselHolder />
      <Footer />
    </React.Fragment>
  );
}
