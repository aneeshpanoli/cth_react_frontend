import { useDispatch, useTrackedState } from "reactive-react-redux";
import React, { useEffect, useRef } from "react";
import { MATCH_ID_TITLE } from "../backend/EsQueries";
import { useParams, useHistory } from "react-router-dom";
import { queryEsById, createDoc } from "../backend/AxiosRequest";
import { updateSelectedMT } from "../redux/actions";
import TitleSubtitle from "./TitleSubtitle";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import MTTab from "./MTTab";

import PostComment from "./PostComment";
import ListComments from "./ListComments";
import { Button, IconButton } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import { esAxios } from "../backend/AxiosRequest";
import { MATCH_PROJ_ID } from "../backend/EsQueries";
import throttle from "lodash.throttle";
import AppBar from "@material-ui/core/AppBar";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Head from "../meta/Head";
import { SELECTED_MT } from "../redux/actionTypes";

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

export default function DashBoard() {
  const classes = useStyles();
  const history = useHistory();
  const resourceRef = useRef(null);
  const [slide, setSlide] = React.useState(false);
  // const [currProject, setCurrProject] = React.useState();
  const [isFeedback, setIsFeedback] = React.useState(true);
  const { selectedMT, authData } = useTrackedState();
  const [solutionsList, setSolutionsList] = React.useState();

  let params = useParams();
  const dispatch = useDispatch();
  const handleClose = () => {
    setSlide(false);
  };
  const fetchProj = (id, title, index) => {
    let query = MATCH_ID_TITLE(id, title, index);
    queryEsById(query, dispatch, updateSelectedMT, history);
  };

  function handleActivity() {
    let data = {
      index: "activity",
      q: {
        categoryName: "microtask",
        activity: "visited",
        docId: selectedMT._id,
        title: selectedMT._source.title,
        projectTitle: selectedMT._source.projectTitle,
        projectId: selectedMT._source.projectId,
        userId: authData.user.id,
        username: authData.user.username,
        createdAt: new Date(),
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    createDoc(formData, authData.key, null);
  }

  const getSolutions = () => {
    // update the search project list
    console.log(selectedMT);
    const query = {
      params: {
        index: "solutions",
        q: {
          size: 20,
          query: {
            constant_score: {
              filter: {
                term: {
                  mtId: selectedMT._id,
                },
              },
            },
          },
        },
      },
    };
    console.log(query)
    esAxios
      .get(`/q/`, query)
      .then((response) => {
        // process response.

        // this.setState({results: response});
        console.log(response.data.hits);
        setSolutionsList(response.data.hits.hits);
      })
      .catch((error) => {
        // catch errors.
        console.log(error);
        return error;
      });
  };

  useEffect(() => {
    if (!selectedMT || !selectedMT._source.projectTitle) {
      fetchProj(params.id, params.mt.replace(/-/g, " "), "microtasks");
    } else {
      getSolutions();
      if (authData && authData.user) {
        handleActivity();
      }
    }
    // setCurrProject(selectedMT);
    setIsFeedback(
      authData._source && selectedMT && selectedMT._source.upvotes
        ? !selectedMT._source.upvotes.includes(authData._source.id) &&
            !selectedMT._source.downvotes.includes(authData._source.id)
        : null
    );
  }, [selectedMT]);

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

  return (
    <Box>
      <Head
        title={
          selectedMT
            ? selectedMT._source.projectTitle +
              ": " +
              selectedMT._source.title +
              " - CivicTechHub"
            : null
        }
        description={selectedMT ? selectedMT._source.subtitle : null}
        image={selectedMT ? selectedMT._source.image : null}
      />
      {selectedMT ? (
        <React.Fragment>
          <TitleSubtitle selectedProject={selectedMT} />
          <MTTab selectedMT={selectedMT} solutionsList={solutionsList} />
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
