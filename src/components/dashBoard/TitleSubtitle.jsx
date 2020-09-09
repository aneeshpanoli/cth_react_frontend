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
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import  {useHistory} from 'react-router-dom'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Fade from '@material-ui/core/Fade'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const breadCrumb = (project, history) => {
  if(project && project._source.projectTitle){
  return (
    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
      <Link color="inherit" style={{cursor:'pointer'}} onClick={(event)=>{
        event.preventDefault();
        history.push("/"+project._source.projectTitle+"/"+project._source.projectId)
        }}>
      {project._source.projectTitle}
      </Link>
  <Typography color="textPrimary">{project._source.title}</Typography>
    </Breadcrumbs>
  )
}else{
    return project._source.title
  }
}


export default function TitleSubtitle({ selectedProject }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Fade
    timeout={400}
      in={true}
      style={{ transitionDelay: true ? "300ms" : "0ms" }}
    >
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
                {breadCrumb(selectedProject, history)}
              </h1>
              <hr></hr>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <AvatarIcon />
              <hr></hr>
            </Grid>
            <Grid container justify="center">
              <Grid item xs={3} sm={2} md={2} align="left">
                <ProjectVote selectedProject={selectedProject} />
              </Grid>

              <Grid item xs={9} sm={10} md={10}>
                <Grid container>
                  <Grid item xs={12}>
                    <h5 style={{ color: "grey" }}>
                      {selectedProject
                        ? selectedProject._source.subtitle
                        : null}
                    </h5>
                    <hr></hr>
                  </Grid>
                  <Grid item xs={12} align="right">
                    <SocialShare selectedProject={selectedProject} />
                    <ProjectSettings selectedProject={selectedProject} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
    </Fade>
  );
}
