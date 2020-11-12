import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import nasdaq from "../../Assets/img/Partnership_v1.svg";
import invest from "../../Assets/img/invest_cth.webp";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
  },
  image: {
    maxWidth: "50vw",
    maxHeight: "13rem",
  },
}));

export default function FooterGrid() {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      spacing={1}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={6} align="center">
        <a
          href="https://www.nasdaq.com/articles/ocean-v3-brings-wave-of-data-monetization-tools-to-ethereum-2020-10-27"
          target="_blank"
        >
          {" "}
          <img src={nasdaq} className={classes.image} />
        </a>
      </Grid>
      <Grid item xs={12} sm={12} md={6} align="center">
        <a
          href="https://market.oceanprotocol.com/asset/did:op:C1d97aEAb57622B2d139f10351B48CBf94071e5c"
          target="_blank"
        >
          {" "}
          <img src={invest} className={classes.image} />
        </a>
      </Grid>
    </Grid>
  );
}
