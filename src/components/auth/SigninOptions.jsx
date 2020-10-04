import React from "react";
import Container from "@material-ui/core/Container";
import EmailSignin from "./EmailSignin";
import SocialSignin from "./SocialSignin";

export default function SigninOptions(props) {
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "5%" }}>
      <EmailSignin reset={props.reset} bttnStyle={props.bttnStyle} />
      <SocialSignin signUp={props.signUp} bttnStyle={props.bttnStyle} />
    </Container>
  );
}
