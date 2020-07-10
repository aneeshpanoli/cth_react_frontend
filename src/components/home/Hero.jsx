import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import heroimg from '../../Assets/img/hero.svg';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      minHeight: 400,
      position: "relative",
    },
  }));


export default function Hero () {
    const classes = useStyles();

  const history = useHistory();
  const handleClick = (selectedProject) => {
    history.push("/solve");
  };


    return (
        <Box style={{borderBottom:'1px solid #061F71', marginBottom:'2rem'}}>
        <Container className='hero-div' 
        style={{backgroundImage: "url(" + heroimg + ")", minHeight:500}}>
        <div 
          style={{ backgroundColor: "rgba(255,255,255, 0.8)" 
          , borderRadius:5, padding:10,  color:'black'}}>
          <h1 style={{fontWeight:700, wordWrap: 'break-word' }}>COVID-19 Pandemic</h1>
            <h4 style={{color:'#696969'}}>is the defining global health <span style={{fontWeight:700, color:'black'}}>crisis </span> 
            of our time. The world needs your help!</h4>
            <h3 style={{marginTop:'1rem', color:'grey'}}><span style={{fontWeight:700, color:'#061F71'}}>CivicTechHub </span> 
            offers the largest database of projects dedicated to fighting 
            <span style={{fontWeight:700, color:'black'}}> crises</span>. <span style={{fontWeight:700, color:'black'}}>Join </span> 
             a project and help humanity defeat COVID.</h3>
           

          </div>
          <h3 style={{marginTop:'4%', color:'grey'}}> 
             <Button color='secondary' variant="contained" 
             style={{height:'3rem', width:'10rem', fontSize:25, fontWeight:700, textTransform:'none'}}
             onClick={handleClick}
             >
                Search {'>'}
            </Button>  Projects.</h3>
        </Container>
      </Box>
    );
  }


