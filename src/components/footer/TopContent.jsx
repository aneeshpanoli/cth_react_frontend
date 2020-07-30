import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '20rem',
    backgroundColor: theme.palette.secondary.light
  },
}));

export default function FooterGrid() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12} sm={12} md={6}>
       
      </Grid>
    </Grid>
  );
}
