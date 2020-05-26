import React, { useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ScrollUpButton from "react-scroll-up-button";
import Navbar from './navbarComponent'
import RecipeCard from './recipeCard'
import { Collapse } from '@material-ui/core';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateSlideSearchResults } from '../redux/actions'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  

export default function SearchResults(){

    const { expanded, searchRecipeList } = useTrackedState()
    const dispatch = useDispatch()
    const backToSearchResults = () => {
        dispatch(updateSlideSearchResults(false));
    }
    
     // scroll search results to top on on state change
     const resultDiv = useRef(null); 
     useEffect(() => {
        window.scrollTo(0, resultDiv.current.offsetTop);
     });


    return (
        <Container ref={resultDiv}>   
            <Navbar />
            <RecipeCard/>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Button variant="contained" 
            color="secondary" 
            onClick={backToSearchResults}
            startIcon={<ArrowBackIosIcon />}
            >
            Back
            </Button>
                I am in.
            </Collapse>
            <ScrollUpButton />
        </Container>

    );
  }

