import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import heroimg from "../../Assets/img/cth_hero_k.svg";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";

export default function Hero() {
  const history = useHistory();
  const handleClick = (selectedProject) => {
    history.push("/search");
  };

  const handleJoin = (selectedProject) => {
    history.push("/sign-in");
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} md={6}>
          <Container style={{ paddingLeft: "12%", paddingTop: "5%" }}>
            <Grid item xs={12}>
              <h1 style={{ fontWeight: 700, wordWrap: "break-word" }}>
                THE LARGEST NETWORK OF COVID SOLUTIONS
              </h1>

              <h3 style={{ marginTop: "1rem", color: "grey" }}>
                CivicTechHub offers the largest database of projects dedicated
                to fighting the current crises. <br /> Join now to browse
                projects, find support and help humanity defeat COVID-19.
              </h3>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                style={{
                  height: "2.5rem",
                  width: "10rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  borderRadius: 50,
                  fontSize: 20,
                  fontWeight: 400,
                  textTransform: "none",
                }}
                onClick={handleJoin}
              >
                Join now
              </Button>
            </Grid>
            <Grid item xs={12}>
              <h3 style={{ color: "grey" }}>
                <Button
                  endIcon={<SearchIcon style={{ transform: `scale(-1, 1)` }} />}
                  color="primary"
                  variant="outlined"
                  disableElevation
                  style={{
                    height: "2.5rem",
                    width: "18rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    borderRadius: 15,
                    fontSize: 17,
                    color: "grey",
                    fontWeight: 400,
                    textTransform: "none",
                    cursor: "text",
                  }}
                  onClick={handleClick}
                >
                  {"Search projects...     "}
                  {"         "}
                </Button>
              </h3>
            </Grid>
          </Container>
        </Grid>
        {/* <Grid
          item
          xs={12}
          sm={6}
          md={6}
          className="hero-div"
          style={{
            backgroundImage: "url(" + heroimg + ")",
            minHeight: "30rem",
          }}
        > */}
        <Grid item xs={12} sm={6} md={6} container justify="flex-end">
          <img alt="hero-img" src={heroimg} style={{ width: "95%" }}></img>
        </Grid>
      </Grid>
    </Box>
  );
}
