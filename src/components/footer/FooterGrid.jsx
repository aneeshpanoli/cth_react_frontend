import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Paper from "@material-ui/core/Paper";
import EmailIcon from "@material-ui/icons/Email";
import YouTubeIcon from "@material-ui/icons/YouTube";
import AppsIcon from "@material-ui/icons/Apps";
import Button from "@material-ui/core/Button";
import CthIcon from "../../Assets/img/cth_icon_light.svg";
import CreateIcon from "@material-ui/icons/Create";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import BookIcon from "@material-ui/icons/Book";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "visible",
    width: "100%",
    justifyContent: "flex-end",
  },
  paper: {
    display: "table-cell",
    height: "17rem",
    width: "100%",
    overflow: "visible",
    backgroundColor: "transparent",
    verticalAlign: "middle",
  },
  button: {
    textTransform: "none",
    marginRight: 5,
    fontSize: 15,
  },
  icon: {
    marginRight: 5,
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
      <Grid item xs={6} sm={6} md={6}>
        
              <Button
                size="small"
                color="secondary"
                className={classes.button}
                href="https://github.com/civictechhub"
              >
                <GitHubIcon className={classes.icon} />
                GitHub
              </Button>
              <br></br>
              <Button
                size="small"
                color="secondary"
                className={classes.button}
                href="https://www.linkedin.com/company/civictechhub"
              >
                <LinkedInIcon className={classes.icon} />
                LinkedIn
              </Button>
              <br></br>
              <Button
                size="small"
                color="secondary"
                className={classes.button}
                href="https://www.instagram.com/civictechhub/"
              >
                <InstagramIcon className={classes.icon} />
                Instagram
              </Button>
              <br></br>
              <Button
                size="small"
                color="secondary"
                className={classes.button}
                href="https://www.facebook.com/civictechhub"
              >
                <FacebookIcon className={classes.icon} />
                Facebook
              </Button>
              <br></br>
              <Button
                size="small"
                color="secondary"
                className={classes.button}
                href="https://twitter.com/civictechhub?lang=en"
              >
                <TwitterIcon className={classes.icon} />
                Twitter
              </Button>
              <br />
              <Button
                size="small"
                color="secondary"
                className={classes.button}
                href="https://www.youtube.com/channel/UCWjIvbOBLmToD4vrOHED89Q"
              >
                <YouTubeIcon className={classes.icon} />
                YouTube
              </Button>
              <br />
            
          </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Button
          startIcon={<img style={{ height: "1.3rem" }} src={CthIcon}></img>}
          size="small"
          color="secondary"
          className={classes.button}
          href=""
        >
          About us
        </Button>
        <br />
        <Button
          startIcon={<CreateIcon className={classes.icon} />}
          size="small"
          color="secondary"
          className={classes.button}
          href=""
        >
          Feedback
        </Button>
        <br />
        <Button
          startIcon={<LoyaltyIcon className={classes.icon} />}
          size="small"
          color="secondary"
          className={classes.button}
          href=""
        >
          Support us
        </Button>
        <br />
        <Button
          startIcon={<EmailIcon className={classes.icon} />}
          size="small"
          color="secondary"
          className={classes.button}
          href=""
        >
          Contact us
        </Button>
        <br />
        <Button
          startIcon={<BookIcon className={classes.icon} />}
          size="small"
          color="secondary"
          className={classes.button}
          href="https://medium.com/@civictechhub"
        >
          Our blog
        </Button>
        <br/>
        <Button
                size="small"
                color="secondary"
                className={classes.button}
                href="https://join.slack.com/t/civictechhub/shared_invite/zt-dlw4duki-LjqG1llwXA8KDodp3x34cg"
              >
                <AppsIcon className={classes.icon} />
                Join our Slack
              </Button>
      </Grid>
    </Grid>
  );
}
