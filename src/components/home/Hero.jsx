import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import heroimg from "../../Assets/img/hero.svg";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function Hero() {
  const classes = useStyles();

  const history = useHistory();
  const handleClick = (selectedProject) => {
    history.push("/search");
  };

  return (
    <Box style={{ borderBottom: "1px solid #061F71", marginBottom: "2rem" }}>
      <Grid container spacing={2}>
        
        <Grid item xs={12} sm={6} md={6}>
        <Container>
          <Grid item xs={12}>
           
              <h1 style={{ fontWeight: 700, wordWrap: "break-word" }}>
                THE LARGEST NETWORK OF COVID SOLUTIONS
              </h1>
 
              <h3 style={{ marginTop: "1rem", color: "grey" }}>
                CivicTechHub offers the largest database of projects dedicated
                to fighting the current crises. <br/> Join now to browse projects, find support
                and help humanity defeat COVID-19.
              </h3>
          
          </Grid>
          <Grid item xs={12}>
            <h3 style={{ color: "grey" }}>
              <Button
                color="secondary"
                variant="contained"
                style={{
                  height: "3rem",
                  width: "10rem",
                  fontSize: 25,
                  fontWeight: 700,
                  textTransform: "none",
                }}
                onClick={handleClick}
              >
                Search {">"}
              </Button>{" "}
              Projects.
            </h3>
          </Grid>
          </Container>
        </Grid>
        <Grid
          item
          xs={12} sm={6} md={6}
          className="hero-div"
          style={{ backgroundImage: "url(" + heroimg + ")", minHeight: '30rem' }}
        ></Grid>
      </Grid>
    </Box>
  );
}
