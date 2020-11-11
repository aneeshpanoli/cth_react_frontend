import React from "react";
import shuffle from "lodash/shuffle";
import ProjectCard from "./ProjectCard";
import Container from "@material-ui/core/Container";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import { MATCH, MATCH_RETURN_RANDOM } from "../backend/EsQueries";
import { esAxios } from "../backend/AxiosRequest";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import DoubleArrowSharpIcon from "@material-ui/icons/DoubleArrowSharp";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#E8E8E8",
        borderRadius: 15,
        width: "2rem",
        height: "2rem",
        textAlign: "center",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#E8E8E8",
        borderRadius: 15,
        width: "2rem",
        height: "2rem",
        textAlign: "center",
      }}
      onClick={onClick}
    />
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default function HomeCarousel({ term }) {
  const settings = {
    className: "center",
    infinite: true,
    cssEase: "linear",
    dots: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: getRandomInt(10000, 12000),
    pauseOnDotsHover: true,
    pauseOnHover: true,
    swipe: true,
    touchThreshold: 100,
    mobileFirst: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
    adaptiveHeight: true,
    afterChange: function (index) {
      // console.log(
      //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      // );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToScroll: 3,

          arrows: true,
          dots: true,
          centerPadding: "4rem",
          centerMode: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToScroll: 2,

          centerPadding: "1.2rem",
          centerMode: true,
          autoplay: false,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToScroll: 1,
          centerPadding: "1.2rem",
          centerMode: true,
          autoplay: false,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const [projList, setProjList] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState();
  React.useEffect(() => {
    if (term && term !== searchTerm) {
      queryDatabase(term);
      setSearchTerm(term);
    }
  }, [term]);
  const queryDatabase = (searchValue) => {
    let query = MATCH_RETURN_RANDOM(searchValue, "storyText", 10);
    esAxios
      .get(`/q/`, query)
      .then((response) => {
        const shuffledProjectList = shuffle(response.data.hits.hits);
        console.log(response.data.hits);
        setProjList(response.data.hits.hits);
      })
      .catch((error) => {
        // catch errors.
        console.log(error);
      });
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
              <Slider {...settings}>
                {projList.map((r, i) => (
                  <ProjectCard key={i} r={r} />
                ))}
              </Slider>
            </Container>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Grid item xs={12}>
            <Container>
              <Slider {...settings}>
                {Array.from(new Array(6)).map((item, index) => (
                  <Box key={index} width={210} marginRight={0.5} my={5}>
                    <Skeleton variant="rect" width="100%" height={50} />
                    <Skeleton />
                    <Skeleton width="60%" />
                  </Box>
                ))}
              </Slider>
            </Container>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
