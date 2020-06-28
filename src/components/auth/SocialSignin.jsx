import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import google from "../../Assets/img/google.svg";
import { Fab } from "@material-ui/core";
import { SvgIcon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
  },
  button: {
    margin: "0.5rem",
  },
  googleStyle: {
    fillColor: theme.palette.primary.main,
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<img src={google}></img>}
      >
        Sign in With Google
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<GitHubIcon />}
      >
        Sign in with GitHub
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<LinkedInIcon />}
      >
        Sign in with LinkedIn
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<TwitterIcon />}
      >
        Sign in with Twitter
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<FacebookIcon />}
      >
        Sign in with Facebook
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<InstagramIcon />}
      >
        Sign in with Instagram
      </Button>
    </div>
  );
}

