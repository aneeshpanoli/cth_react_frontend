import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import CthIcon from "../../Assets/img/cth.svg";
import YouTubeSvg from "../../Assets/img/yt.svg";
import GhSvg from "../../Assets/img/gh.svg";
import TwSvg from "../../Assets/img/tw.svg";
import InSvg from "../../Assets/img/in.svg";
import IgSvg from "../../Assets/img/ig.svg";
import FbSvg from "../../Assets/img/fb.svg";
import SlackSvg from "../../Assets/img/slack.svg";
import telegram from "../../Assets/img/telegram-icon.svg";

const useStyles = makeStyles((theme) => ({
  button: {},
  icon: {
    height: "2.5rem",
    margin: "0.6rem",
  },
}));

export default function FooterGrid() {
  const classes = useStyles();
  const FooterIcon = (props) => {
    return (
      <Link
        size="small"
        color="secondary"
        className={classes.button}
        href={props.href}
      >
        <img alt={props.alt} className={classes.icon} src={props.iconSvg}></img>
      </Link>
    );
  };
  return (
    <React.Fragment>
      <FooterIcon
        iconSvg={GhSvg}
        alt="Github"
        href="https://github.com/civictechhub"
      />

      <FooterIcon
        iconSvg={InSvg}
        alt="LinkedIn"
        href="https://www.linkedin.com/company/civictechhub"
      />

      <FooterIcon
        iconSvg={IgSvg}
        alt="igicon"
        href="https://www.instagram.com/civictechhub/"
      />
      <FooterIcon
        iconSvg={FbSvg}
        alt="fbicon"
        href="https://www.facebook.com/civictechhub"
      />
      <FooterIcon
        iconSvg={TwSvg}
        alt="twicon"
        href="https://twitter.com/civictechhub?lang=en"
      />

      <FooterIcon
        iconSvg={YouTubeSvg}
        alt="yticon"
        href="https://www.youtube.com/channel/UCWjIvbOBLmToD4vrOHED89Q"
      />
      <FooterIcon
        iconSvg={SlackSvg}
        alt="Slack"
        href="https://join.slack.com/t/civictechhub/shared_invite/zt-dlw4duki-LjqG1llwXA8KDodp3x34cg"
      />
      <FooterIcon
        iconSvg={telegram}
        alt="telegram"
        href="https://t.me/civictechhub"
      />
      <FooterIcon iconSvg={CthIcon} alt="cthIcon" href="/about-us" />
    </React.Fragment>
  );
}
