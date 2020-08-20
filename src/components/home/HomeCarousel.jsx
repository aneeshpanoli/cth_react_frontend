import React from "react";
import ProjectCard from "../search/ProjectCard";
import Container from "@material-ui/core/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import { MATCH } from "../backend/EsQueries";
import { esAxios } from "../backend/AxiosRequest";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import { queryElasticsearch } from "../backend/AxiosRequest";
import { useDispatch } from "reactive-react-redux";
import { updateProjectList, updateProgress } from "../redux/actions";

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

export default function SwipeToSlide(props) {
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
          arrows: true,
          dots: true,
          centerPadding: "4rem",
          centerMode: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
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
          centerPadding: "1.2rem",
          centerMode: true,
          autoplay: false,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const dispatch = useDispatch();

  const [categoryList, setCategoryList] = React.useState();
  const queryDatabase = (searchValue) => {
    // localStorage.removeItem(searchValue)
    // const localData = JSON.parse(localStorage.getItem(searchValue));
    // if(localData){
    //   console.log('from local store')
    //   setCategoryList(localData);
    //   return
    // }
    let query = MATCH(searchValue, "storyText", 10);
    esAxios
      .get(`/q/`, query)
      .then((response) => {
        setCategoryList(response.data.hits);
        // localStorage.setItem(searchValue, JSON.stringify(response.data.hits))
      })
      .catch((error) => {
        // catch errors.
        console.log(error);
        return error;
      });
  };

  React.useEffect(() => {
      queryDatabase(props.term);
  }, [props.term]);

  const queryEsDatabase = (searchValue) => {
    if (searchValue && searchValue.length > 1) {
      dispatch(updateProgress(true));
      // send to axios
      let query = MATCH(searchValue, "storyText", 100);
      queryElasticsearch(
        searchValue,
        query,
        dispatch,
        updateProjectList,
        props.redirect
      );
    }
  };

  return (
    <React.Fragment>
      {categoryList && categoryList[0] ? (
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
                <h4>{props.term}</h4>
              </Grid>
              <Grid item sm={4} xs={4} md={4} align="right">
                <Link
                  to={(location) => ({
                    ...location,
                    pathname: "/search/" + props.term,
                  })}
                  style={{
                    textDecoration: "none",
                    fontSize: "1.2rem",
                    color: "black",
                  }}
                >
                  View more {">"}
                </Link>
              </Grid>
            </Grid>
          </Container>
          <Divider light />

          <Grid item xs={12}>
            <Container>
              <Slider {...settings}>
                {categoryList.map((r, i) => (
                  <ProjectCard key={i} r={r} />
                ))}
              </Slider>
            </Container>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Container>
            {/* <sup>Category</sup> */}
            <h4>{props.term}</h4>
          </Container>
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
