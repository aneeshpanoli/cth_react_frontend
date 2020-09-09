import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { Badge, Button, Tooltip } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import menuIcon from "../../Assets/img/menuIcon.svg";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import NavSearchField from "../search/NavSearchField";
import Logo from "../../Assets/img/cth_logo.svg";
import TextLogo from "../../Assets/img/cth_text.svg";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import AvatarMenu from "../menu/TopNavAvatarLogin";
import TopNavMenu from "../menu/TopNavMainMenu";
import Collapse from "@material-ui/core/Collapse";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { useHistory } from "react-router-dom";
import { useTrackedState } from "reactive-react-redux";
import { useTheme } from "@material-ui/core/styles";


import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

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

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const history = useHistory();
  const { authData } = useTrackedState();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleCreateProject = () => {
    if (authData.isAuthenticated) {
      history.push("/create-project");
      return;
    } else {
      history.push("/sign-in");
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Button
          startIcon={<MailIcon />}
          aria-label="show 4 new mails"
          color="inherit"
        >
          <Badge badgeContent={0} color="secondary">
            Messages
          </Badge>
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          startIcon={<NotificationsIcon />}
          aria-label="show 11 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="secondary">
            Notifications
          </Badge>
        </Button>
      </MenuItem>
      <MenuItem>
        <Button
          variant="text"
          startIcon={<NoteAddIcon />}
          aria-label="create project"
          color="inherit"
          onClick={handleCreateProject}
        >
          Create a project
        </Button>
      </MenuItem>
    </Menu>
  );
  const [expanded, setExpanded] = React.useState(true);
  const handleOnFocus = () => {
    if (theme.breakpoints.down("sm")) {
      setExpanded(false);
    }
  };

  const handleOnBlur = () => {
    console.log("focused");
    setExpanded(true);
  };

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <HideOnScroll {...props}>
      <AppBar >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Link to={(location) => ({ ...location, pathname: "/" })}>
              <img
                alt="logo"
                src={Logo}
                style={{ height: "3rem", verticalAlign: "center" }}
              />
            </Link>
          </IconButton>
          <Hidden smDown>
            <Link to={(location) => ({ ...location, pathname: "/" })}>
              <img
                alt="textlogo"
                src={TextLogo}
                style={{
                  height: "2rem",
                  margin: "0.5rem",
                  verticalAlign: "center",
                }}
              />
            </Link>
          </Hidden>
          <div style={{ width: "100%" }}>
            <NavSearchField onFocus={handleOnFocus} onBlur={handleOnBlur} />
          </div>
          <Hidden smUp>
            <Collapse in={expanded} timeout={0} unmountOnExit>
              {" "}
              <AvatarMenu />
            </Collapse>
          </Hidden>
          <Hidden xsDown>
            {" "}
            <AvatarMenu />
          </Hidden>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip arrow title="Messages">
              <IconButton aria-label="show new mails" color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Notifications">
              <IconButton
                aria-label="show new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="Create project">
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleCreateProject}
                color="inherit"
              >
                <NoteAddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <img alt="logo" src={menuIcon} style={{ height: "1.2rem" }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
