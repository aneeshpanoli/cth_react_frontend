import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import AvatarMenu from '../menu/TopNavAvatarLogin';
import { useHistory, useParams, Link} from "react-router-dom";
import TopNavMenu from '../menu/TopNavMainMenu'
import BackdropFilter from "react-backdrop-filter";
import Logo from '../../Assets/img/cth.svg'


const useStyles = makeStyles((theme) => ({
  
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
  },
  scroll: {
    zIndex: 3,
    color: 'white',
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
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


export default function BackToTop(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
      <AppBar 
      color="primary"
      elevation={1}
      >
      {/* <BackdropFilter
                className="bluredForm"
                filter={"blur(2px) sepia(0%)"}
                canvasFallback={true}
                html2canvasOpts={{
                    allowTaint: true
                }}
                > */}
        <Toolbar variant="dense">
        
        <Link to={location => ({ ...location, pathname: "/" })}>
        <img src={Logo} style={{ height:'2rem', marginRight:'1rem'}}/> 
          </Link>
          <AvatarMenu />
          <TopNavMenu />
        </Toolbar>
        {/* </BackdropFilter> */}
      </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
     
      <ScrollTop {...props}>
        <Fab className={classes.scroll} color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
