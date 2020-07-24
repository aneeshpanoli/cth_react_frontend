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
      <Grid container>
        <Grid item xs={12} sm={6} md={8}>
          <Container>
          <Grid item xs={12}>
           
              <h1 style={{ fontWeight: 700, wordWrap: "break-word" }}>
                COVID-19 Pandemic
              </h1>
              <h4 style={{ color: "#696969" }}>
                is the defining global health{" "}
                <span style={{ fontWeight: 700, color: "black" }}>crisis </span>
                of our time. The world needs your help!
              </h4>
              <h3 style={{ marginTop: "1rem", color: "grey" }}>
                <span style={{ fontWeight: 700, color: "#061F71" }}>
                  CivicTechHub{" "}
                </span>
                offers the largest database of projects dedicated to fighting
                <span style={{ fontWeight: 700, color: "black" }}> crises</span>
                . <span style={{ fontWeight: 700, color: "black" }}>Join </span>
                a project and help humanity defeat COVID.
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
          xs={12} sm={6} md={4}
          className="hero-div"
          style={{ backgroundImage: "url(" + heroimg + ")", minHeight: '30rem' }}
        ></Grid>
      </Grid>
    </Box>
  );
}
