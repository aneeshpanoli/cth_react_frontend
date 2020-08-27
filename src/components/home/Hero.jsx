import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import heroimg from "../../Assets/img/cth_hero_k.svg";
import heroMobile from "../../Assets/img/hero_mobile.svg";
import Grid from "@material-ui/core/Grid";
import SearchField from "./SearchFieldHome";
import SearchForm from "../search/SearchField";
import Hidden from "@material-ui/core/Hidden";
import { useTrackedState } from "reactive-react-redux";

export default function Hero() {
  const history = useHistory();
  const { authData } = useTrackedState();
  const handleClick = () => {
    setTimeout(() => {
      history.push("/search");
    }, 1000);
  };

  const handleJoin = () => {
    history.push("/sign-in");
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          style={{ paddingLeft: "5%", paddingTop: "3%" }}
        >
          <Hidden xsDown>
            <Grid item md={12}>
              <h1 style={{ fontWeight: 700, wordWrap: "break-word" }}>
                THE LARGEST NETWORK OF COVID SOLUTIONS
              </h1>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid
              item
              xs={12}
              className="hero-div"
              style={{
                backgroundImage: "url(" + heroMobile + ")",
                width: "100%",
                minHeight: "27rem",
              }}
            >
              <h1 style={{ fontWeight: 700 }}>
                THE LARGEST NETWORK OF COVID SOLUTIONS
              </h1>
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <h4>
              CivicTechHub offers the largest database of projects dedicated to
              fighting the current crises. <br /> Join now to browse projects,
              find support and help humanity defeat COVID-19.
            </h4>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "2rem" }}>
            {authData && authData.isAuthenticated ? null : (
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                style={{
                  height: "2.5rem",
                  width: "10rem",
                  borderRadius: 50,
                  fontSize: 20,
                  fontWeight: 400,
                  textTransform: "none",
                }}
                onClick={handleJoin}
              >
                Join now
              </Button>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          >
            <SearchForm
              style={{
                margin: "auto 0",
                maxWidth: "30rem",
                width: "100%",
              }}
              progressStyle={{
                margin: "auto 0",
                maxWidth: "0rem",
                width: "0%",
              }}
            />
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item xs={12} sm={4} md={4} container justify="flex-end">
            <img alt="hero-img" src={heroimg} style={{ width: "100%" }}></img>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  );
}
