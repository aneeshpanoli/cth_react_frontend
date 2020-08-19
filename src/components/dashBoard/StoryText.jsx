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
  buttonTup: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "green",
    },
  },
  buttonTdown: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    width: theme.spacing(6),
    height: theme.spacing(6),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "red",
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
      props.fetchProj(props.selectedProject._id, props.selectedProject._source.title);
    updateProject(
      formData,
      authData.key,
      history,
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
          source:
            "ctx._source." +
            field1 +
            ".add(params." +
            field1 +
            ")",
          lang: "painless",
          params: {
            [field1]: authData._source.id,
          },
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));
    updateProject(
      formData,
      authData.key,
      history,
      props.selectedProject._source.title,
      null
    );
  };

  const handleUpvote = () => {
    removeVotes("downvotes");
    addVotes("upvotes");
  };

  const handleDownvote = () => {
    removeVotes("upvotes");
    addVotes("downvotes");
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

              <Badge color="secondary" badgeContent={0}>
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"
                >
                  <ToolTips
                    title={"Upvote"}
                  >
                    <IconButton
                      aria-label="Upvote"
                      className={classes.buttonTup}
                      onClick={handleUpvote}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                  </ToolTips>
                  <ToolTips title={"Downvote"}>
                    <IconButton
                      aria-label="add to favorites"
                      className={classes.buttonTdown}
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
                props.selectedProject ? props.selectedProject._source.storyText : null
              )}
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </Box>
  );
}
