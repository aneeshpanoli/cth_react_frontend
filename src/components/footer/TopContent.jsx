import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import nasdaq from "../../Assets/img/Partnership_v1.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "1oo%",
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default function FooterGrid() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1} justify="center">
      <Grid item xs={12} sm={12} md={6} align="center">
        <a
          href="https://www.nasdaq.com/articles/ocean-v3-brings-wave-of-data-monetization-tools-to-ethereum-2020-10-27"
          target="_blank"
        >
          {" "}
          <img src={nasdaq} />
        </a>
      </Grid>
    </Grid>
  );
}
