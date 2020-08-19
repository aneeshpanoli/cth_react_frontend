import Avatar from "@material-ui/core/Avatar";

import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { logout } from "../auth/auth";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontWeight: 700,
    backgroundColor: "Gainsboro",
  },
  paper: {
    marginRight: theme.spacing(3),
  },
}));

export default function AvatarButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authData } = useTrackedState();
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

  const handleProfile = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    history.push("/@" + authData.user.username);
  };
  const handleLogout = (event) => {
    logout(dispatch);
    // logout tabs
    localStorage.setItem("CREDENTIALS_FLUSH", Date.now().toString());
    localStorage.removeItem("CREDENTIALS_FLUSH");
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
        style={{ borderRadius: 20 }}
      >
        <Avatar
          variant="circle"
          className={classes.small}
          alt={authData && authData.user ? authData.user.first_name : null}
        >
          <img
            src={
              authData && authData._source && authData._source.avatar
                ? authData._source.avatar
                : undefined
            }
            style={{
              position: "absolute",
              width: "2.5rem",
              height: "2.5rem",
              left: -3,
              top: 3,
            }}
          />
        </Avatar>
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
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
