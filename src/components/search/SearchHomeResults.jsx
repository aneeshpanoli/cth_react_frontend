import React, { useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateSlideSearchResults } from '../redux/actions'
import CarouselHolder from './CarouselHolder'




export default function SearchResults(){

    const dispatch = useDispatch()
    const backToSearchResults = () => {
        dispatch(updateSlideSearchResults(false));
        
    }
    
     // scroll search results to top on on state change
    //  const resultDiv = useRef(null); 
    //  useEffect(() => {
    //     window.scrollTo(0, resultDiv.current.offsetTop);
    //  });


    return (
        // <Container maxwidth="lg" ref={resultDiv}>   
        <Container maxwidth="lg">   
        <CarouselHolder/> 
        </Container>

    );
  }

