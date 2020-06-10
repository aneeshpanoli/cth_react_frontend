import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import React, { useRef, useEffect } from 'react';
import ProjectCard from './projectCard';



export default function SearchCarousel(props){

  

  return (

<Carousel
  slidesPerPage={3}
  arrows
  breakpoints={{
    700: {
      slidesPerPage: 1,
      arrows: false
    },
    1000: {
      slidesPerPage: 2,
      arrows: false
    }
  }}
>
{props.categoryList.map((r, i) => 
<React.Fragment key={i}>
  
  <ProjectCard r={r} />
  </React.Fragment>
)}
</Carousel>
  );
}