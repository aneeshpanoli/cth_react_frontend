import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import MenuButton from "../buttons/TopNavMenuBttn";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import { useSnackbar } from "notistack";
import { useTrackedState } from "reactive-react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const { authData } = useTrackedState();
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateClick = (path) => {
    if (authData.isAuthenticated) {
      history.push(path);
      return;
    }
    enqueueSnackbar("Please Sign in to create project!", {
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
      <Button color="secondary" onClick={handleClickOpen}>
        <MenuIcon />
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
            startIcon={<MenuIcon />}
            style={{ color: "black" }}
          >
            Menu
          </Button>
        </DialogTitle>

        <DialogActions>
          <MenuButton
            startIcon={<HomeIcon />}
            onClick={() => handleOnClick("/")}
          >
            Home
          </MenuButton>
        </DialogActions>
        <DialogActions>
          <MenuButton
            startIcon={<AddIcon />}
            onClick={() => handleCreateClick("/create-project")}
          >
            Create a Project
          </MenuButton>
        </DialogActions>
        <DialogActions>
          <MenuButton
            startIcon={<SearchIcon />}
            onClick={() => handleOnClick("/search/covid")}
          >
            Search Projects
          </MenuButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
