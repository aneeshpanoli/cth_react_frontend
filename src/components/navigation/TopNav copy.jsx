import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import AvatarMenu from "../menu/TopNavAvatarLogin";
import { Link } from "react-router-dom";
import TopNavMenu from "../menu/TopNavMainMenu";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import NavSearchField from "../search/NavSearchField";
import Logo from "../../Assets/img/cth_logo.svg";
import TextLogo from "../../Assets/img/cth_text.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(0),
    right: theme.spacing(2),
    zIndex: 1,
  },
  scroll: {
    zIndex: 3,
    color: "white",
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const handleOnFocus = () =>{
  console.log('focused')
}

export default function BackToTop(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar color="primary" elevation={1}>
          <Toolbar variant="dense">
            <Grid container direction='row' >
              <Grid item md={4} sm={1} xs={2}>
                <Grid container>
                  <Grid item>
                    <Link to={(location) => ({ ...location, pathname: "/" })}>
                      <img alt="logo" src={Logo} style={{ height: "3rem", verticalAlign:'center'}} />
                    </Link>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={3} align="left">
                      <Link to={(location) => ({ ...location, pathname: "/" })}>
                        <img
                          alt="textlogo"
                          src={TextLogo}
                          style={{ height: "2rem", margin:'0.5rem', verticalAlign:'center'}}
                        />
                      </Link>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Grid item md={8} sm={11} xs={10}>
                <Grid container direction='row'>
                  <Grid item xs>
                  <NavSearchField style={{marginTop:'0.2rem auto'}} onFocus={handleOnFocus}/>
                  </Grid>
                  <Grid item xs>
                  <AvatarMenu />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />

      <ScrollTop {...props}>
        <Fab
          className={classes.scroll}
          color="primary"
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

{
  /* 
      <Grid container spacing={1} justify='space-between'>
            
            
            
            <Grid item xs={1} align='left'>
            <Link to={(location) => ({ ...location, pathname: "/" })}>
            <img alt="logo" src={Logo} style={{ height: "3rem"}} />
            </Link>
            </Grid>
            <Hidden smDown>
              <Grid item md={3} align='left'>
                <Link to={(location) => ({ ...location, pathname: "/" })}>
                  <img alt="textlogo" src={TextLogo} style={{ width: "100%" }} />
                </Link>
              </Grid>
              </Hidden>
              <Grid item xs={9} sm={10} md={8} align='middle'>
                <SearchField style={{margin:'auto 0'}}/>
              </Grid>
            </Grid>
            <Grid item xs={1} ><AvatarMenu /></Grid>
            <Grid item xs={1} ><TopNavMenu /></Grid>

            import BackdropFilter from "react-backdrop-filter";
            <BackdropFilter
                className="bluredForm"
                filter={"blur(2px) sepia(0%)"}
                canvasFallback={true}
                html2canvasOpts={{
                    allowTaint: true
                }}
                >  </BackdropFilter> */
}
