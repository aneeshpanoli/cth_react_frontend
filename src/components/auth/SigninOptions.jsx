import React from "react";
import Container from "@material-ui/core/Container";
import EmailSignin from "./EmailSignin";
import SocialSignin from "./SocialSignin";

export default function SigninOptions(props) {
  return (
    <Container component="main" maxWidth="xs" style={{marginTop:'5%'}}>
      <SocialSignin />
      <EmailSignin signUp={props.signUp} />
    </Container>
  );
}
