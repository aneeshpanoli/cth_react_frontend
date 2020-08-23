import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import SocialShare from "./SocialShare";
import Settings from "./Settings";
import ToolTips from "../menu/ToolTips";
import { useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import parseHtml from "html-react-parser";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { queryEsById, updateProject } from "../backend/AxiosRequest";
import { updateSelectedProject } from "../redux/actions";
import { red, green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "3rem",
    paddingBottom: "1rem",
    color: "white",
    position: "relative",
    backgroundColor: theme.palette.primary.main,
    fontSize: "1.2rem",
  },
  buttonRound: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#000",
    },
  },
  redButton: {
   
    color: theme.palette.danger,
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  greenButton: {
   
    color: theme.palette.safe,
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonTup: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.safe,
    },
  },
  buttonTdown: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.danger,
    },
  },

  buttonIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

export default function Header(props) {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const { authData } = useTrackedState();
  const removeVotes = (field) => {
    let data = {
      status: "projectvote",
      index: props.selectedProject._index,
      id: props.selectedProject._id,
      q: {
        script: {
          source:
            "ctx._source." +
            field +
            ".remove(ctx._source." +
            field +
            ".indexOf(params." +
            field +
            "))",
          lang: "painless",
          params: {
            [field]: authData._source.id,
          },
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    const updateData = () =>
      props.fetchProj(
        props.selectedProject._id,
        props.selectedProject._source.title
      );
    updateProject(
      formData,
      authData.key,
      null,
      props.selectedProject._source.title,
      updateData
    );
  };

  const addVotes = (field1) => {
    let data = {
      status: "projectvote",
      index: props.selectedProject._index,
      id: props.selectedProject._id,
      q: {
        script: {
          source: "ctx._source." + field1 + ".add(params." + field1 + ")",
          lang: "painless",
          params: {
            [field1]: authData._source.id,
          },
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));
    const updateData = () =>
    props.fetchProj(
      props.selectedProject._id,
      props.selectedProject._source.title
    );
    updateProject(
      formData,
      authData.key,
      null,
      props.selectedProject._source.title,
      updateData
    );
  };

  const handleUpvote = () => {
    if (!authData.isAuthenticated) {
      history.push("/sign-in");
      return;
    }
    if (
      props.selectedProject._source.downvotes &&
      props.selectedProject._source.downvotes.includes(authData._source.id)
    ) {
      removeVotes("downvotes");
    }

    if (
      props.selectedProject._source.upvotes &&
      !props.selectedProject._source.upvotes.includes(authData._source.id)
    ) {
      addVotes("upvotes");
    }
  };

  const handleDownvote = () => {
    if (!authData.isAuthenticated) {
      history.push("/sign-in");
      return;
    }
    if (
      props.selectedProject._source.upvotes &&
      props.selectedProject._source.upvotes.includes(authData._source.id)
    ) {
      removeVotes("upvotes");
    }
    if (
      props.selectedProject._source.downvotes &&
      !props.selectedProject._source.downvotes.includes(authData._source.id)
    ) {
      addVotes("downvotes");
    }
  };
  // console.log(props.selectedProject)

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <Box className={`${classes.paper} dash-header-div`}
    <Box className={classes.root}>
      {props.selectedProject ? (
        <Container>
          <Grid
            container

            // left: "50%",
            // transform: `translateX(-50%)`,
          >
            <Grid
              item
              md={3}
              sm={5}
              xs={12}
              align="center"
              style={{
                position: "absolute",
                top: -38,
              }}
            >
              <IconButton
                aria-label="back"
                className={classes.buttonRound}
                onClick={() => history.goBack()}
              >
                <ArrowBackIcon className={classes.buttonIcon} />
              </IconButton>

              <Badge
                color="secondary"
                badgeContent={0}
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
              >
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"
                  disabled={
                    authData._source&&authData._source.id === props.selectedProject._source.owners
                  }
                >
                  <ToolTips title={authData._source&&props.selectedProject._source.upvotes&&props.selectedProject._source.upvotes.includes(
                          authData._source.id
                        )?"You upvoted this":"Upvote"}>
                    <IconButton
                      aria-label="Upvote"
                      className={
                        authData._source&&props.selectedProject._source.upvotes&&props.selectedProject._source.upvotes.includes(
                          authData._source.id
                        )
                          ? `${classes.greenButton}`: `${classes.buttonTup}`
                          
                      }
                      onClick={handleUpvote}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                  </ToolTips>
                  <ToolTips title={authData._source&&props.selectedProject._source.downvotes&&props.selectedProject._source.downvotes.includes(
                          authData._source.id
                        )?"You downvoted this":"Downvote"}>
                    <IconButton
                      aria-label="add to favorites"
                      className={
                        authData._source&&props.selectedProject._source.downvotes&&props.selectedProject._source.downvotes.includes(
                          authData._source.id
                        )
                          ? `${classes.redButton}` : `${classes.buttonTdown}`
                          
                      }
                      onClick={handleDownvote}
                    >
                      <ThumbDownIcon />
                    </IconButton>
                  </ToolTips>
                </ButtonGroup>
              </Badge>

              <SocialShare selectedProject={props.selectedProject} />

              <Settings selectedProject={props.selectedProject} />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              {parseHtml(
                props.selectedProject
                  ? props.selectedProject._source.storyText
                  : null
              )}
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </Box>
  );
}
