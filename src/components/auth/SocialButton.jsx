import React from "react";
import SocialLogin from "react-social-login";
import Button from "@material-ui/core/Button";

class SocialLoginButton extends React.Component {
  render() {
    return (
      <Button
        onClick={this.props.triggerLogin}
        {...this.props}
        variant="contained"
        color="secondary"
        className={this.props.bttnStyle}
        fullWidth
        startIcon={this.props.startIcon}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default SocialLogin(SocialLoginButton);
