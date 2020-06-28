import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import YouTubeIcon from '@material-ui/icons/YouTube';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'visible',
    width: '100%',
    justifyContent:'flex-end',
  },
  paper: {
    display: 'table-cell',
    height: '13rem',
    width: '100%',
    overflow: 'visible',
    backgroundColor: "transparent",
    verticalAlign:"middle",
    
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function FooterGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={spacing}>
            <Grid >
              <Paper className={classes.paper} elevation={0}>
                <Link
                    href="https://github.com/civictechhub"
                >
                <GitHubIcon className="mr-2"/>
                    GitHub
                </Link>
                <br></br>
                <Link
                    href="https://www.linkedin.com/company/civictechhub"
                >
                    <LinkedInIcon className="mr-2"/>
                    LinkedIn
                </Link>
                <br></br>
                <Link
                    href="https://www.instagram.com/civictechhub/"
                >
                    <InstagramIcon className="mr-2"/>
                    Instagram
                </Link>
                <br></br>
                <Link
                    href="https://www.facebook.com/civictechhub"
                >
                    <FacebookIcon className="mr-2"/>
                    Facebook
                </Link>
                <br></br>
                <Link
                    href="https://twitter.com/civictechhub?lang=en"
                >
                    <TwitterIcon className="mr-2"/>
                    Twitter
                </Link>
                <br/>
                <Link
                    href="https://www.youtube.com/channel/UCWjIvbOBLmToD4vrOHED89Q"
                >
                    <YouTubeIcon className="mr-2"/>
                    YouTube
                </Link>
                <br/>
                <Link
                    href="https://join.slack.com/t/civictechhub/shared_invite/zt-dlw4duki-LjqG1llwXA8KDodp3x34cg"
                >
                    <AppsIcon className="mr-2"/>
                    Slack
                </Link>
                </Paper>
            </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  );
}
