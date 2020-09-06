import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AvatarIcon from "../userProfile/AvatarIcon";
import Box from "@material-ui/core/Box";
import ProjHero from "../../Assets/img/project_hero.svg";
import { coverImgUrl } from "../js/utils";
import Hidden from '@material-ui/core/Hidden';


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
    ><Hidden mdUp>
    <Grid item xs={12} sm={12} md={12} align="center">
      <img
        alt="hero-img"
        src={coverImgUrl(selectedProject._source.image)}
        style={{
          width: "100%",
          height:'10rem',
          objectFit:'cover',
        }}
      ></img>
    </Grid>
    </Hidden>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={7} md={7}>
            <h1 style={{ wordWrap: "break-word", marginTop:"1rem"}}>
              {selectedProject ? selectedProject._source.title : null}
            </h1>
            <hr></hr>
            <h5 style={{ color: "grey" }}>
              {selectedProject ? selectedProject._source.subtitle : null}
            </h5>
            <AvatarIcon />
            
          </Grid>
<Hidden smDown>
          <Grid item xs={12} sm={5} md={5} align="center">
            <img
              alt="hero-img"
              src={coverImgUrl(selectedProject._source.image)}
              style={{
                width: "100%",
                margin:'1rem',
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
