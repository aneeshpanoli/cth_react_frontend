import React, { useRef, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateFilterProject } from '../redux/actions'
import ProjectCard from "./projectCard";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import SearchFilter from './SearchFilter';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 250,
        maxWidth:'auto',
        margin: "0.3rem",

    },
    paper: {
      
    },
  }));



export default function SearchResults(){
    const { filterProjectList } = useTrackedState();
    const classes = useStyles();

     // scroll search results to top on on state change
    //  const resultDiv = useRef(null); 
    //  useEffect(() => {
    //     window.scrollTo(0, resultDiv.current.offsetTop);
    //  });


    return (
        // <Container maxwidth="lg" ref={resultDiv}>   
        <Grid container spacing={1} justify="space-around" 
        direction="row"
        >
        <Grid item xs={12} sm={12}>
        <Box justifyContent="center"> 
        <Card className={classes.root} variant="outlined"> 
        {filterProjectList?
            <SearchFilter />
            :
            null}
        </Card>
        </Box>
        </Grid>
        <Grid item xs={12} sm={12} >
        <Box display="flex" flexWrap="wrap" justifyContent="center"> 
        {filterProjectList? filterProjectList.map((r, i) => (
            <ProjectCard key={i} r={r} />
          )):null} 
          </Box>
        </Grid>
        </Grid>

    );
  }
