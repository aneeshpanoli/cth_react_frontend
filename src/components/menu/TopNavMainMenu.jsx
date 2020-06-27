import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useHistory, useParams, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import MenuButton from "../buttons/TopNavMenuBttn";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { useSnackbar } from "notistack";
import { useTrackedState } from "reactive-react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  button: {
    height: "3rem",
    width: "15rem",
  },
}));

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

  const { authData } = useTrackedState();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateClick = (path) => {
    if (authData.isAuthenticated) {
      history.push(path);
      return;
    }
    enqueueSnackbar("Please Sign in to create challenge!", {
      variant: "error",
    });
  };
  const handleOnClick = (path) => {
    history.push(path);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <MenuOpenIcon />
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Button
            disabled
            startIcon={<MenuOpenIcon />}
            style={{ color: "black" }}
          >
            <h3>Menu</h3>
          </Button>
        </DialogTitle>

        <DialogActions>
          <MenuButton
            startIcon={<HomeIcon />}
            onClick={() => handleOnClick("/")}
          >
            <h4>Home</h4>
          </MenuButton>
        </DialogActions>
        <DialogActions>
          <MenuButton
            startIcon={<AddIcon />}
            onClick={() => handleCreateClick("/create")}
          >
            <h4>Create a challenge</h4>
          </MenuButton>
        </DialogActions>
        <DialogActions>
          <MenuButton
            startIcon={<SearchIcon />}
            onClick={() => handleOnClick("/solve")}
          >
            <h4>Solve a challenge</h4>
          </MenuButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
