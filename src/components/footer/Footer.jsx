import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import footerLogo from "../../Assets/img/cth_footer.svg";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TopContent from './TopContent'

function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      CivicTechHub {}
      {new Date().getFullYear()} {props.children}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  logobox: {
    backgroundColor: theme.palette.primary.main,
    height: '6rem',
    
  },
  mainbox: {
    backgroundColor: theme.palette.secondary.dark,
  },
  footerlogo: { 
   width:'100%',
   marginTop: '1rem'
  },
}));
export default function Footer() {
  const history = useHistory();
  const classes = useStyles();
  const handleClick = (page) => {
    history.push(page);
  };

  return (
    <Box className={classes.mainbox}>
      <Box>
        <TopContent/>
      </Box>
      <Box className={classes.logobox}>
        <Container>
          <Grid container >
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
      <Container style={{height:'3rem', verticalAlign:'center'}}>

        <Copyright>
          |{" "}
          <Button
            size="small"
            style={{ textTransform: "none" }}
            onClick={() => handleClick("/privacy-policy")}
          >
            Privacy Policy
          </Button>{" "}
          |
          <Button
            size="small"
            style={{ textTransform: "none" }}
            onClick={() => handleClick("/terms-and-conditions")}
          >
            Terms & conditions
          </Button>
        </Copyright>
      </Container>
    </Box>
  );
}
