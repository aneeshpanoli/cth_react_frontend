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
import { socialSignIn } from "../backend/AxiosRequest";
import SocialButton from "./SocialButton";
//https://github.com/deepakaggarwal7/react-social-login/blob/master/demo/containers/demo.js
const handleSocialLogin = (user) => {
  console.log(user);
};

const handleSocialLoginFailure = (err) => {
  console.error(err);
};

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
      <SocialButton
        provider="facebook"
        appId="2005220039621593"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
        startIcon={<FacebookIcon />}
        key={'fb'}
      >
        Sign in with Facebook
      </SocialButton>

      <SocialButton
        provider="instagram"
        redirect=""
        appId="2005220039621593"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
        startIcon={<InstagramIcon />}
        key={'instagram'}
      >
        Sign in with instagram
      </SocialButton>


     
    </div>
  );
}
