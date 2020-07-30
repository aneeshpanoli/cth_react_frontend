import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import footerLogo from "../../Assets/img/cth_footer.svg";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TopContent from "./TopContent";

function Copyright(props) {
  return (
    <span style={{ fontSize: 16 }}>
      {"©"}
      {new Date().getFullYear()}
      {} CivicTechHub
      {props.children}
    </span>
  );
}
const useStyles = makeStyles((theme) => ({
  logobox: {
    backgroundColor: theme.palette.primary.main,
    height: "6rem",
  },
  mainbox: {
    backgroundColor: theme.palette.secondary.dark,
    marginTop: "2rem",
  },
  footerlogo: {
    width: "100%",
    marginTop: "1rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
}));
export default function Footer() {
  const history = useHistory();

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const handleClick = (page) => {
    history.push(page);
  };

  return (
    <Box className={classes.mainbox}>
      <Box>
        <TopContent />
      </Box>
      <Box className={classes.logobox}>
        <Container>
          <Grid container>
            <Grid item md={4} sm={12} xs={12}>
              <img
                alt="footer-logo"
                src={footerLogo}
                className={classes.footerlogo}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Grid container justify="center" style={{ height: "2.5rem" }}>
        <Copyright>
          {" "}
          {bull}
          <Button
            size="small"
            style={{ textTransform: "none", fontSize: 16 }}
            onClick={() => handleClick("/privacy-policy")}
          >
            Privacy Policy
          </Button>{" "}
          {bull}
          <Button
            size="small"
            style={{ textTransform: "none", fontSize: 16 }}
            onClick={() => handleClick("/terms-and-conditions")}
          >
            Terms
          </Button>
        </Copyright>
      </Grid>
    </Box>
  );
}
