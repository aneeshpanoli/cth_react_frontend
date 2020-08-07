import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SocialShare from "./SocialShare";
import Settings from "./Settings";
import ToolTips from "../menu/ToolTips";
import { useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";

import parseHtml from "html-react-parser";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
    width: theme.spacing(7),
    height: theme.spacing(7),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#000",
    },
  },
  buttonRoundHrt: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
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

export default function Header({ selectedProject }) {
  const classes = useStyles();
  let history = useHistory();

  // console.log(selectedProject)

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // <Box className={`${classes.paper} dash-header-div`}
    <Box className={classes.root}>
      {selectedProject ? (
        <Container>
          <Grid
            container
            

            // left: "50%",
            // transform: `translateX(-50%)`,
          >
            <Grid item md={3} sm={5} xs={12} container justify="space-between"
            style={{
              position: "absolute",
              top: -25,
            }}
            >
              <IconButton
                aria-label="add to favorites"
                className={classes.buttonRound}
                onClick={() => history.goBack()}
              >
                <ArrowBackIcon className={classes.buttonIcon} />
              </IconButton>

              <IconButton
                aria-label="add to favorites"
                className={classes.buttonRoundHrt}
              >
                <Badge color="secondary" badgeContent={500}>
                  <ToolTips title="Like">
                    <FavoriteIcon className={classes.buttonIcon} />
                  </ToolTips>
                </Badge>
              </IconButton>
              <SocialShare />

              <Settings selectedProject={selectedProject} />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
            {parseHtml(
            selectedProject ? selectedProject._source.storyText : null
          )}
            </Grid>
          </Grid>
          
        </Container>
      ) : null}
    </Box>
  );
}
