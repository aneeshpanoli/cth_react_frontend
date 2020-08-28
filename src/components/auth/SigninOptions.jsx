import React from "react";
import Container from "@material-ui/core/Container";
import EmailSignin from "./EmailSignin";
import SocialSignin from "./SocialSignin";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginBottom: "0.5rem",
    textTransform: "none",
    backgroundColor: "#FFFFFF"
  },
}));

export default function SigninOptions(props) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "5%" }}>
      <EmailSignin reset={props.reset} bttnStyle={classes.buttons}/>
      <SocialSignin signUp={props.signUp} bttnStyle={classes.buttons} />
    </Container>
  );
}
