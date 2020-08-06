import React from "react";
import ProjectCard from "../search/ProjectCard";
import Container from "@material-ui/core/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddMicrotask from './AddMicrotask'

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
        width:'2rem',
        height:'2rem',
        textAlign:'center',
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
        width:'2rem',
        height:'2rem',
        textAlign:'center',
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

export default function SwipeToSlide({ categoryList }) {
  const settings = {
    className: "center",
    infinite: true,
    cssEase: "linear",
    dots: true,
    lazyLoad: "ondemand",
    slidesToShow: 5,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: getRandomInt(10000, 12000),
    pauseOnDotsHover: true,
    pauseOnHover: true,
    swipe:true,
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
          slidesToShow: 4,
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
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <React.Fragment>
      
        <Container>
        <Slider {...settings}>
        {categoryList && categoryList[0] ? categoryList.map((r, i) => (
            <ProjectCard key={i} r={r} />
          )) : null}
          <AddMicrotask />
        </Slider>
        </Container>
      
    </React.Fragment>
  );
}
