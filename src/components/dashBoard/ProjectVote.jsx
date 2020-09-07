import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

import Tooltip from '@material-ui/core/Tooltip';
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
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: "1rem",
    color: "white",
  },
  buttonRound: {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#000",
    },
  },
  redButton: {
    color: theme.palette.danger,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  greenButton: {
    color: theme.palette.safe,
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonTup: {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.safe,
    },
  },
  buttonTdown: {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.danger,
    },
  },

  buttonIcon: {},
}));

export default function ProjectVote(props) {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const { authData } = useTrackedState();
  const [upvotes, setUpvotes] = React.useState([]);
  const [downvotes, setDownvotes] = React.useState([]);

  React.useEffect(() => {
    if (props.selectedProject && props.selectedProject._source.downvotes) {
      setDownvotes(props.selectedProject._source.downvotes);
    }
    if (props.selectedProject && props.selectedProject._source.upvotes) {
      setUpvotes(props.selectedProject._source.upvotes);
    }
  }, [props]);
  const updateVotes = (field1, field2) => {
    let data = {
      status: "projectvote",
      index: props.selectedProject._index,
      id: props.selectedProject._id,
      q: {
        doc: {
          upvotes: field1,
          downvotes: field2,
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    const updateData = (hits) => dispatch(updateSelectedProject(hits));
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
    if (!upvotes.includes(authData._source.id)) {
      updateVotes(
        [...upvotes, authData._source.id],
        [...downvotes].filter((id) => id !== authData._source.id)
      );
    } else {
      updateVotes(
        [...upvotes].filter((id) => id !== authData._source.id),
        [...downvotes]
      );
    }
  };

  const handleDownvote = () => {
    if (!authData.isAuthenticated) {
      history.push("/sign-in");
      return;
    }
    if (!downvotes.includes(authData._source.id)) {
      updateVotes(
        [...upvotes].filter((id) => id !== authData._source.id),
        [...downvotes, authData._source.id]
      );
    } else {
      updateVotes(
        [...upvotes],
        [...downvotes].filter((id) => id !== authData._source.id)
      );
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
            <Grid item md={4} sm={6} xs={12} align="center">
              <Badge
                color="secondary"
                badgeContent={0}
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
              >
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"
                  orientation="vertical"
                  size="small"
                  disabled={
                    authData._source &&
                    authData._source.id === props.selectedProject._source.owners
                  }
                >
                  {/* <IconButton
                aria-label="back"
                className={classes.buttonRound}
                onClick={() => history.goBack()}
              >
                <ArrowBackIcon className={classes.buttonIcon} />
              </IconButton> */}
                  <Tooltip
                  placement='top'
                  arrow
                    title={
                      authData._source && upvotes.includes(authData._source.id)
                        ? "You upvoted this"
                        : "Upvote"
                    }
                  >
                    <IconButton
                      aria-label="Upvote"
                      className={
                        authData._source &&
                        upvotes.includes(authData._source.id)
                          ? `${classes.greenButton}`
                          : `${classes.buttonTup}`
                      }
                      onClick={handleUpvote}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    disabled
                    variant="text"
                    style={{ fontWeight: 700, fontSize: "1.2rem" }}
                  >
                    {props.selectedProject._source.upvotes.length -
                      props.selectedProject._source.downvotes.length}
                  </Button>
                  <Tooltip
                  arrow
                    title={
                      authData._source &&
                      downvotes.includes(authData._source.id)
                        ? "You downvoted this"
                        : "Downvote"
                    }
                  >
                    <IconButton
                      aria-label="add to favorites"
                      className={
                        authData._source &&
                        downvotes.includes(authData._source.id)
                          ? `${classes.redButton}`
                          : `${classes.buttonTdown}`
                      }
                      onClick={handleDownvote}
                    >
                      <ThumbDownIcon />
                    </IconButton>
                  </Tooltip>
                </ButtonGroup>
              </Badge>

             
            </Grid>
          </Grid>
        </Container>
      ) : null}
    </Box>
  );
}
