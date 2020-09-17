import { useDispatch, useTrackedState } from "reactive-react-redux";
import React, { useEffect, useRef } from "react";
import { MATCH_ID_TITLE } from "../backend/EsQueries";
import { useParams, useHistory } from "react-router-dom";
import { queryEsById, createDoc } from "../backend/AxiosRequest";
import { updateSelectedSolution, updateMicrotaskList } from "../redux/actions";
import TitleSubtitle from "./TitleSubtitle";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import SolutionTab from "./SolutionTab";

import PostComment from "./PostComment";
import ListComments from "./ListComments";
import { Button, IconButton } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import { simpleQueryElasticsearch } from "../backend/AxiosRequest";
import { MATCH_PROJ_ID } from "../backend/EsQueries";
import throttle from "lodash.throttle";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Head from "../meta/Head";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

export default function SolutionHome() {
  const classes = useStyles();
  const history = useHistory();
  const resourceRef = useRef(null);
  const [slide, setSlide] = React.useState(false);
  const [currProject, setCurrProject] = React.useState();
  const [microtasks, setMicrotasks] = React.useState();
  const [isFeedback, setIsFeedback] = React.useState(true);
  const { selectedSolution, authData, microtaskList } = useTrackedState();

  let params = useParams();
  const dispatch = useDispatch();
  const handleClose = () => {
    setSlide(false);
  };
  const fetchProj = (id, title, index) => {
    let query = MATCH_ID_TITLE(id, title, index);
    queryEsById(query, dispatch, updateSelectedSolution, history);
  };

  function handleActivity() {
    let data = {
      index: "activity",
      q: {
        categoryName: "solution",
        activity: "visited",
        docId: selectedSolution._id,
        title: selectedSolution._source.title,
        projectTitle:selectedSolution._source.projectTitle,
        projectId:selectedSolution._source.projectId,
        userId: authData.user.id,
        username: authData.user.username,
        createdAt: new Date(),
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    createDoc(formData, authData.key, null);
  }

  useEffect(() => {
    if (!selectedSolution || !selectedSolution._source.mtTitle) {
      fetchProj(params.id, params.mtsol.replace(/-/g, " "), "solutions");
    } else {
      const query = MATCH_PROJ_ID(selectedSolution._id, "solutions");
      simpleQueryElasticsearch(query, dispatch, updateMicrotaskList);
      if (authData && authData.user) {
        handleActivity();
      }
    }
    setCurrProject(selectedSolution);
    setIsFeedback(
      authData._source && selectedSolution && selectedSolution._source.upvotes
        ? !selectedSolution._source.upvotes.includes(authData._source.id) &&
            !selectedSolution._source.downvotes.includes(authData._source.id)
        : null
    );
  }, [selectedSolution]);
  const handleScroll = throttle(() => {
    if (resourceRef && resourceRef.current && isFeedback) {
      if (
        resourceRef.current.getBoundingClientRect().top <
        (window.innerHeight * 1) / 2
      ) {
        if (authData.isAuthenticated) {
        }
        setSlide(true);
      } else {
        // setSlide(false)
      }
    }
  }, 100);
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMicrotasks(microtaskList);
  }, [microtaskList]);

  return (
    <Box>
      <Head
        title={
          currProject
            ? currProject._source.projectTitle +
              ": " +
              currProject._source.title +
              " - CivicTechHub"
            : null
        }
        description={currProject ? currProject._source.subtitle : null}
        image={currProject ? currProject._source.image : null}
      />
      {currProject ? (
        <React.Fragment>
              
          <TitleSubtitle selectedProject={currProject} />
          <SolutionTab selectedProject={currProject}/>
          <Container>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12} ref={resourceRef}>
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
      {isFeedback ? (
        <Slide in={slide} direction="up">
          <AppBar position="fixed" color="secondary" className={classes.appBar}>
            <Toolbar>
              <Container>
                <Grid container spacing={2}>
                  <Grid item sm={6} md={6} xs={12}>
                    <h3>Do you like this project? </h3>
                  </Grid>
                  <Grid item sm={6} md={6} xs={12}>
                    Your feedback will help us to identify the most promising
                    projects. Thank you!
                  </Grid>
                </Grid>
              </Container>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Slide>
      ) : null}
    </Box>
  );
}
