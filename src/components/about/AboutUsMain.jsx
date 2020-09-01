import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProfileCard from "./ProfileCard";
import apImage from "../../Assets/img/team/aneesh.svg";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& hr": {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

export default function AboutUsMian() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item align="center" xs={12} sm={12} md={12}>
        <h3 style={{ marginTop: "5%" }}>Our Team</h3>
      </Grid>

      <Grid item align="center" xs={12} sm={6} md={4}>
        <ProfileCard
          name="Vincent Verheyen"
          bio="Vincent is a polyglot who worked in multiple countries, including Solomon Islands, Taiwan, Sweden, Costa Rica, Germany, Australia, Italy, Portugal, Belgium. Wanting to find a broader community to increase knowledge transfer, innovation and collaboration led Vincent to start CivicTechHub."
          linkedin="https://be.linkedin.com/in/vincent-mia-edie-verheyen-79323a167"
          twitter="https://twitter.com/vincentmiaedie"
       />
      </Grid>
      <Grid item align="center" xs={12} sm={6} md={4}>
        <ProfileCard
          name="Aneesh Panoli"
          image={apImage}
          linkedin="https://www.linkedin.com/in/aneeshpanoli/"
          twitter="https://twitter.com/aneeshpanoli"
        />
      </Grid>
      <Grid item align="center" xs={12} sm={6} md={4}>
        <ProfileCard name="Karen" />
      </Grid>
    </Grid>
  );
}
