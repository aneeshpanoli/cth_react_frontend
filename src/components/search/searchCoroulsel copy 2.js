import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import React, { useRef, useEffect } from 'react';
import ProjectCard from './projectCard';
import Box from '@material-ui/core/Box';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function SearchCarousel(props){

  

  return (
<Carousel 
  slidesPerPage={3}
  arrows
  keepDirectionWhenDragging
  breakpoints={{
    700: {
      slidesPerPage: 1,
      arrows: true
    },
    1000: {
      slidesPerPage: 2,
      arrows: true
    }
  }}
>
{props.categoryList.map((r, i) => 
  
  <ProjectCard r={r} />
)}
</Carousel>
  );
}