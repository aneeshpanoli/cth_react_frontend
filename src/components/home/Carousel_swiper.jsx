import ProjectCard from "../search/ProjectCard";
import Container from "@material-ui/core/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import React,{useEffect,useRef} from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

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
    slidesToShow: 3,
    dots: true,
    swipeToSlide: true,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: getRandomInt(10000, 12000),
    pauseOnDotsHover: true,
    pauseOnHover: true,
    swipe:true,
    touchThreshold: 100,
    mobileFirst: true,
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
          arrows: true,
          slidesToShow: 3,
          infinite: true,
          dots: true,
          centerPadding: "4rem",
          centerMode: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          initialSlide: 2,
          infinite: true,
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
          slidesToShow: 1,
          infinite: true,
          centerPadding: "1.1rem",
          centerMode: true,
          autoplay: false,
          arrows: false,
          dots: true
        },
      },
    ],
  };
  const swiper = useRef(null)
  useEffect(()=>{
      swiper.current=new Swiper('.swiper-container',{...})
//add necessary parameters required by checking the offical docs of swiper
},[])
  return (
    <React.Fragment>
      {categoryList && categoryList[0] ? (
        <Container className="swiper-container"> 

          {categoryList.map((r, i) => (
            <SwiperSlide>
            <ProjectCard key={i} r={r} />
            </SwiperSlide>
          ))}
        </Container>
      ) : null}
    </React.Fragment>
  );
}
