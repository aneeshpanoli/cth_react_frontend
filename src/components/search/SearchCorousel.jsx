import React from "react";
import "@brainhubeu/react-carousel/lib/style.css";
import ProjectCard from "./ProjectCard";
import Box from "@material-ui/core/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "grey" }}
      onClick={onClick}
    />
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default function SwipeToSlide({categoryList}) {
    const settings = {
      className: "center",
      infinite: true,
      slidesToShow: 3,
      swipeToSlide: true,
      lazyLoad: true,
      margin: '1rem',

      autoplay: true,
      autoplaySpeed: getRandomInt(2800, 3000),
      cssEase: "linear",
      pauseOnHover: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      afterChange: function (index) {
        // console.log(
        //   `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        // );
      },
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            infinite: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
          },
        },
      ],
    };
    return (
      
      <Box style={{marginBottom:'2rem'}}>
        {categoryList&&categoryList[0]?
        <Slider {...settings}>
          
          {categoryList.map((r, i) => (
            <Grid item key={i} container spacing={1}>
            <ProjectCard  r={r} />
            </Grid>
          ))}
          
        </Slider>
         :
         null}
        </Box>
       
    );
  }

