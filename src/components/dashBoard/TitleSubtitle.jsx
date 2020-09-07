import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AvatarIcon from "../userProfile/AvatarIcon";
import Box from "@material-ui/core/Box";
import ProjHero from "../../Assets/img/project_hero.svg";
import { coverImgUrl } from "../js/utils";
import Hidden from "@material-ui/core/Hidden";
import ProjectVote from "./ProjectVote";
import SocialShare from "./SocialShare";
import ProjectSettings from "./ProjectSettings";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
      <Hidden mdUp>
        <Grid item xs={12} sm={12} md={12} align="center">
          <img
            alt="hero-img"
            src={coverImgUrl(selectedProject._source.image)}
            style={{
              width: "100%",
              height: "10rem",
              objectFit: "cover",
            }}
          ></img>
        </Grid>
      </Hidden>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={7} md={7}>
          <Grid item xs={12} sm={12} md={12}>
            <h1 style={{ wordWrap: "break-word", marginTop: "1rem" }}>
              {selectedProject ? selectedProject._source.title : null}
            </h1>
            <hr></hr>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
            <AvatarIcon />
            <hr></hr>
            </Grid>
            <Grid container justify='center'>
            <Grid item xs={3} sm={2} md={2} align='left'>
            <ProjectVote selectedProject={selectedProject} />
            </Grid>
            
            <Grid item xs={9} sm={10} md={10}>
            <Grid container>
            <Grid item xs={12}>
            <h5 style={{ color: "grey" }}>
              {selectedProject ? selectedProject._source.subtitle : null}
            </h5>
            <hr></hr>
            </Grid>
            <Grid item xs={12} align='right'>
             <SocialShare selectedProject={selectedProject} />
              <ProjectSettings selectedProject={selectedProject} />
            
            </Grid>
            </Grid>
            </Grid>
            
            </Grid >
            
          </Grid>
          
          <Hidden smDown>
            <Grid item xs={12} sm={5} md={5} align="center">
              <img
                alt="hero-img"
                src={coverImgUrl(selectedProject._source.image)}
                style={{
                  width: "100%",
                  margin: "1rem",
                  boxShadow: "0px 0px 5px grey",
                }}
              ></img>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
}
