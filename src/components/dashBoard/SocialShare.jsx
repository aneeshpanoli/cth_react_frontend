import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import ToolTips from "../menu/ToolTips";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  popShare: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    width: "12rem",
  },
  buttonRound: {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#000",
    },
  },
  buttonIcon: {},
}));

export default function SocialShare(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ToolTips title="Share via Email">
      <EmailShareButton
        url={window.location.href}
        className={classes.buttonIcon}
        subject={props.selectedProject._source.title}
        body={"Hi, \nPlease check out this project from civictechhub.org"}
        separator={". "}
      >
        <EmailIcon color="primary" />
      </EmailShareButton>
      </ToolTips>
      <ToolTips title="Share on Facebook">
      <FacebookShareButton
        url={window.location.href}
        className={classes.buttonIcon}
        quote={
          props.selectedProject._source.title +
          ". " +
          props.selectedProject._source.subtitle
        }
      >
        <FacebookIcon />
      </FacebookShareButton>
      </ToolTips>
      <ToolTips title="Share on Twitter">
      <TwitterShareButton
        // title={props.selectedProject._source.title}
        // hashtags={[
        //   "civictechhub",
        //   "openscience",
        //   "openinnovation",
        //   "FAIR",
        // ]}
        url={window.location.href}
        className={classes.buttonIcon}
        // related={["civictechhub"]}
      >
        <TwitterIcon />
      </TwitterShareButton>
      </ToolTips>
      <ToolTips title="Share on Linkedin">
      <LinkedinShareButton
        url={window.location.href}
        className={classes.buttonIcon}
        // title={props.selectedProject._source.title}
        // summary={props.selectedProject._source.subtitle}
        source={"CivicTechHub"}
      >
        <LinkedInIcon />
      </LinkedinShareButton>
      </ToolTips>
    </React.Fragment>
  );
}
