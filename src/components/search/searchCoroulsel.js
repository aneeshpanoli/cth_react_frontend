import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useRef, useEffect } from 'react';
import ProjectCard from './projectCard';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 96,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


export default function SearchCarousel(props){

  

  return (

<Carousel
  swipeable={true}
  draggable={true}
  minimumTouchDrag={30}
  responsive={responsive}
  ssr={false} // means to render carousel on server-side.
  infinite={false}
  autoPlay={props.deviceType !== "mobile" ? false : false}
  autoPlaySpeed={10000}
  keyBoardControl={true}
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  deviceType={props.deviceType}
  showDots={false}
  centerMode={true}

>
{props.categoryList.map((r, i) => 
<React.Fragment key={i}>
  
  <ProjectCard r={r} />
  </React.Fragment>
)}
</Carousel>
  );
}