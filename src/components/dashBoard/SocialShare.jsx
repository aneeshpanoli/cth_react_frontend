import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import TwitterIcon from "@material-ui/icons/Twitter";
import Container from "@material-ui/core/Container";
import Badge from '@material-ui/core/Badge';
import ToolTips from '../menu/ToolTips'
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  popShare: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    width:'12rem'
  },
  buttonRound: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#000",
    },
  },
  buttonIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));



export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.buttonRound}
      >
         <Badge color="secondary" badgeContent={500}>
           <ToolTips title="Share with friends">
        <ShareIcon className={classes.buttonIcon} />
        </ToolTips>
        </Badge>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
           
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose} dense>
                  <Container className={classes.popShare}>
                    <EmailShareButton
                      url={window.location.href}
                      className={classes.buttonIcon}
                    >
                      <EmailIcon color="primary" />
                    </EmailShareButton>

                    <FacebookShareButton
                      url={window.location.href}
                      quote={"CivicTechHub"}
                      className={classes.buttonIcon}
                    >
                      <FacebookIcon />
                    </FacebookShareButton>

                    <TwitterShareButton
                      url={window.location.href}
                      className={classes.buttonIcon}
                    >
                      <TwitterIcon />
                    </TwitterShareButton>

                    <LinkedinShareButton
                      url={window.location.href}
                      className={classes.buttonIcon}
                    >
                      <LinkedInIcon />
                    </LinkedinShareButton>
                    </Container>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
           
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
