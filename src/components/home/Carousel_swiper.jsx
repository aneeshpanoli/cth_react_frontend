import React from "react";
import ProjectCard from "./ProjectCard";
import Container from "@material-ui/core/Container";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import { MATCH } from "../backend/EsQueries";
import { esAxios } from "../backend/AxiosRequest";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";
import Swiper from "react-id-swiper";
import "swiper/swiper.scss";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default function HomeCarousel({ term }) {
  const [projList, setProjList] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState();
  React.useEffect(() => {
    if (term && term !== searchTerm) {
      queryDatabase(term);
      setSearchTerm(term);
    }
  }, [term]);
  const queryDatabase = (searchValue) => {
    let query = MATCH(searchValue, "storyText", 10);
    esAxios
      .get(`/q/`, query)
      .then((response) => {
        console.log(response.data.hits);
        setProjList(response.data.hits.hits);
      })
      .catch((error) => {
        // catch errors.
        console.log(error);
      });
  };

  const params = {
    centeredSlides: true,
    dynamicBullets: true,
    slidesPerView: "5",
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "progressbar",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return (
    <React.Fragment>
      {projList && projList[0] ? (
        <React.Fragment>
          <Divider style={{ height: "3px" }} />
          <Container>
            <Grid container>
              <Grid item xs={12}>
                <Divider
                  style={{
                    height: "3px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                />
              </Grid>

              <Grid item sm={8} xs={8} md={8} align="left">
                <h5>
                  <StopRoundedIcon />
                  {" " + term}
                </h5>
              </Grid>
              <Grid item sm={4} xs={4} md={4} align="right">
                <Link
                  to={(location) => ({
                    ...location,
                    pathname: "/search/" + term,
                  })}
                  style={{
                    textDecoration: "none",
                    fontSize: "1rem",
                    color: "black",
                  }}
                >
                  View more <DoubleArrowSharpIcon />
                </Link>
              </Grid>
            </Grid>
          </Container>
          <Divider light />

          <Grid item xs={12}>
            <Container>
              <Swiper {...params}>
                {projList.map((r, i) => {
                  return (
                    <div key={i}>
                      <ProjectCard r={r} />
                    </div>
                  );
                })}
              </Swiper>
            </Container>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid item xs={12}>
            <Container>
              <Swiper {...params}>
                {Array.from(new Array(6)).map((item, index) => (
                  <Box key={index} width={210} marginRight={0.5} my={5}>
                    <Skeleton variant="rect" width="100%" height={50} />
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                ))}
              </Swiper>
            </Container>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
