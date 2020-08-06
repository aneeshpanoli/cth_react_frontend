import { useDispatch, useTrackedState } from "reactive-react-redux";
import React, { useEffect, useRef } from "react";
import { MATCH_ID_TITLE } from "../backend/EsQueries";
import { useParams, useHistory } from "react-router-dom";
import { queryEsById } from "../backend/AxiosRequest";
import { updateSelectedProject } from "../redux/actions";
import TitleSubtitle from "./TitleSubtitle";
import Container from "@material-ui/core/Container";
import ChallengeCarousel from './ChallengeCarousel'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import StoyText from "./StoryText";
import ProjectLinks from "./ProjectLinks";
import ProjectVideo from "./ProjectVideo";
import ProjectTech from "./ProjectTech";
import PostComment from "./PostComment";
import ListComments from "./ListComments";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const history = useHistory();
  const [currProject, setCurrProject] = React.useState();
  const { selectedProject, authData } = useTrackedState();
  let params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!selectedProject) {
      let query = MATCH_ID_TITLE(params.id, params.name.replace(/-/g, " "));
      queryEsById(query, dispatch, updateSelectedProject, history);
    }
    setCurrProject(selectedProject);
  }, [selectedProject]);

  return (
    <React.Fragment>
      {currProject ? (
        <React.Fragment>
          <TitleSubtitle selectedProject={currProject} />
          <StoyText selectedProject={currProject} />
          <Container>
            <Grid container spacing={2}>
            <Grid item sm={12} md={12} xs={12}>
                <h2>Microtasks</h2>
              </Grid>
            <Grid item sm={12} md={12} xs={12}>
                <ChallengeCarousel categoryList={[]}/>
              </Grid>
              <Grid item sm={12} md={12} xs={12}>
                <h2>Resources</h2>
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <ProjectVideo selectedProject={currProject} />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <ProjectLinks selectedProject={currProject} />
                <ProjectTech selectedProject={currProject} />
              </Grid>

              <Grid item sm={12} xs={12}>
                <Paper className={classes.paper}>
                  <h4>Comments</h4>
                  <Divider />
                  {params.id ? (
                    <React.Fragment>
                      <ListComments projectId={params.id} />
                      <Divider />
                    </React.Fragment>
                  ) : null}

                  {authData.isAuthenticated && params.id ? (
                    <PostComment projectId={params.id} />
                  ) : (
                    <h5>
                      Please <Button href="/sign-in">sign in </Button> to post
                      comments
                    </h5>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}
