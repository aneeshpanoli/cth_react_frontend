import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  button: {
    margin:'0.5rem'
  }
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="secondary" className={classes.button}>
        Login With Google
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        Login with GitHub
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        Login with LinkedIn
      </Button>
      <Button variant="contained" color="secondary" className={classes.button}>
        Login with Twitter
      </Button>
      <Button variant="contained" color="secondary" href="#contained-buttons" className={classes.button}>
        Login with Facebook
      </Button>
    </div>
  );
}
