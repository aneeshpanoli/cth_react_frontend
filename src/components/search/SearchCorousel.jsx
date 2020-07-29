import React from "react";
import ProjectCard from "./ProjectCard";
import Container from "@material-ui/core/Container";
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
      cssEase: 'linear',
      slidesToShow: 3,
      dots:true,
      swipeToSlide: true,
      lazyLoad: true,
      autoplay: true,
      autoplaySpeed: getRandomInt(2800, 3000),
      pauseOnHover: true,
      arrows:false,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />,

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
            dots:true,
            centerMode: false,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            infinite: true,
            centerPadding: "1.2rem",
            centerMode: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            centerPadding: "1.2rem",
            centerMode: true,
          },
        },
      ],
    };
    return (
      
      <Container>
        {categoryList&&categoryList[0]?
        <Slider {...settings}>
          
          {categoryList.map((r, i) => (
            <ProjectCard key={i}  r={r} />
          ))}
          
        </Slider>
         :
         null}
        </Container>
       
    );
  }

