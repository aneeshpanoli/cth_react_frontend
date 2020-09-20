import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProfileCard from "./ProfileCard";
import apImage from "../../Assets/img/team/aneesh.svg";
import vvImage from "../../Assets/img/team/vincent.svg";
import Typography from "@material-ui/core/Typography";

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
      <Grid item align="left" xs={12} sm={12} md={12}>
        <h3 style={{ marginTop: "2rem", marginLeft: "2rem", fontWeight: 700 }}>
          WHO WE ARE
        </h3>
        <hr></hr>
      </Grid>
      <Grid container style={{ marginLeft: "2rem" }}>
        <Grid item align="left" xs={12} sm={6} md={6}>
          <Typography style={{ fontSize: "1.5rem", color: "grey" }}>
            Hello, from team CivicTechHub. CivicTechHub is a non-profit
            organization aimed at promoting collaboration and open innovation
            between individuals and organizations. We're problem solvers and
            creative innovators connected across the globe.
          </Typography>
        </Grid>
        <Grid item align="center" xs={12} sm={6} md={6}></Grid>
        <Grid item xs={12}>
          <hr></hr>
        </Grid>
      </Grid>

      <Grid item align="center" xs={12} sm={6} md={4}>
        <ProfileCard
          name="Vincent Verheyen"
          image={vvImage}
          bio={
            <p>
              Vincent is a polyglot who worked in multiple countries, including
              Solomon Islands, Taiwan, Sweden, Costa Rica, Germany, Australia,
              Italy, Portugal, Belgium. Wanting to find a broader community to
              increase knowledge transfer, innovation and collaboration led
              Vincent to start CivicTechHub.
            </p>
          }
          linkedin="https://be.linkedin.com/in/vincent-mia-edie-verheyen-79323a167"
          twitter="https://twitter.com/vincentmiaedie"
          title="Founder, CEO"
        />
      </Grid>
      <Grid item align="center" xs={12} sm={6} md={4}>
        <ProfileCard
          name="Aneesh Panoli"
          title="CTO"
          image={apImage}
          linkedin="https://www.linkedin.com/in/aneeshpanoli/"
          twitter="https://twitter.com/aneeshpanoli"
          bio={
            <p>
              Aneesh has a very diverse background. He has a Ph.D. in molecular
              genetics and has worked in various industries, such as stock
              trading, gaming, health data, and bioinformatics.
              <p style={{ fontStyle: "italic" }}>
                "Covid19 pandemic has changed our lives in a way we have never
                imagined. Social distancing and lockdowns have brought even more
                people on to the internet. With so many great minds on the web,
                there has never been such an opportunity to foster
                #openinnovation, #collaboration, and #openscience. I'm excited
                about CTH because I believe CTH can do great things in this
                space"
              </p>{" "}
            </p>
          }
        />
      </Grid>
      <Grid item align="center" xs={12} sm={6} md={4}>
        <ProfileCard name="Mika White" title="UX/UI Designer" />
      </Grid>
    </Grid>
  );
}
