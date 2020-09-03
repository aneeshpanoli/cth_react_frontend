import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AvatarIcon from "../userProfile/AvatarIcon";
import Box from "@material-ui/core/Box";
import ProjHero from "../../Assets/img/project_hero.svg";
import { coverImgUrl } from "../js/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function TitleSubtitle({ selectedProject }) {
  const classes = useStyles();

  return (
    <Box
      className="project-grid"
      style={{
        backgroundImage: "url(" + ProjHero + ")",
      }}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} sm={7} md={7}>
            <h1 style={{ wordWrap: "break-word", marginTop:"2rem"}}>
              {selectedProject ? selectedProject._source.title : null}
            </h1>
            <h5 style={{ color: "grey" }}>
              {selectedProject ? selectedProject._source.subtitle : null}
            </h5>
            <AvatarIcon />
          </Grid>

          <Grid item xs={12} sm={5} md={5} align="right">
            <img
              alt="hero-img"
              src={coverImgUrl(selectedProject._source.image)}
              style={{
                width: "30rem",
                marginTop: "4rem",
                marginLeft: "5%",
                marginBottom: "5%",
                boxShadow: "0px 0px 5px grey",
              }}
            ></img>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
