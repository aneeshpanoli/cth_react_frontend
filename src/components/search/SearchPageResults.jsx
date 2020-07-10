import React, { useRef, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateFilterProject } from '../redux/actions'
import ProjectCard from "./ProjectCard";
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
     const resultDiv = useRef(null); 
     useEffect(() => {
        window.scrollTo(0, resultDiv.current.offsetTop);
     }, []);


    return (
        // <Container maxwidth="lg" ref={resultDiv}>   
        <Grid container spacing={0} justify="space-around" 
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
        {filterProjectList?<span>1 - { filterProjectList.length}/{ filterProjectList.length}</span> :null}
        <Grid item xs={12} sm={12} ref={resultDiv} >
        <Box display="flex" flexWrap="wrap" justifyContent="center" > 
        {filterProjectList? filterProjectList.map((r, i) => (
          <Grid item key={r._source.id} xs={12} sm={6} md={3} justifyContent="center">
            <ProjectCard key={i} r={r}/>
            </Grid>
          )):null} 
          </Box>
        </Grid>
        </Grid>

    );
  }

