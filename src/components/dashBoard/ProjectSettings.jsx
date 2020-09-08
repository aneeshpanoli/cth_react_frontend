import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import ToolTips from "../menu/ToolTips";
import SettingsIcon from "@material-ui/icons/Settings";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { useHistory } from "react-router-dom";
import { queryEsById, updateProject } from "../backend/AxiosRequest";
import { updateSelectedProject } from "../redux/actions";
import { MATCH_ID_TITLE } from "../backend/EsQueries";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { postAuthAxios } from "../backend/AxiosRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function ProjectSettings(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { authData } = useTrackedState();
  const [editPermission, setEditPermission] = React.useState(false);
  const [approvePermission, setApprovePermission] = React.useState(false);
  const [approved, setApproved] = React.useState(true);

  const dispatch = useDispatch();
  let history = useHistory();

  const deleteProject = () => {
    const query = {
        index: "projects",
        id: props.selectedProject._id,
      }
    ;
    let formData = new FormData();

    formData.append("params", JSON.stringify(query));
    const authAxios = postAuthAxios(authData.key)
    authAxios
      .post(`/d/`, formData)
      .then((response) => {
        // process response.

        // this.setState({results: response});
        console.log(response.data);
        history.goBack();
      })
      .catch((error) => {
        // catch errors.
        console.log(error);
      });
  };
  const approveProject = () => {
    let data = {
      status: "projectapprove",
      index: props.selectedProject._index,
      id: props.selectedProject._id,
      q: { approved: "yes" },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    let query = MATCH_ID_TITLE(
      props.selectedProject._id,
      props.selectedProject._source.title.replace(/-/g, " ")
    );
    const updateData = () =>
      queryEsById(query, dispatch, updateSelectedProject, history);
    updateProject(
      formData,
      authData.key,
      history,
      props.selectedProject._source.title,
      updateData
    );
  };
  // console.log(props.selectedProject)

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setEditPermission(
      (authData && authData.user && authData._source.staff === "yes") ||
        (props.selectedProject &&
          props.selectedProject._source.owners &&
          authData.user &&
          props.selectedProject._source.owners === authData.user.id)
    );
    setApprovePermission(
      authData && authData.user && authData._source.staff === "yes"
    );
    setApproved(
      props.selectedProject && props.selectedProject._source.approved === "yes"
    );
  }, [authData, props.selectedProject]);

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

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <IconButton
        size="small"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreHorizIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper style={{zIndex:999}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                  Menulis
                >
                  {editPermission ? (
                    <MenuItem onClick={handleClose} dense>
                      <Button
                        color="primary"
                        startIcon={<EditIcon />}
                        variant="text"
                        size="small"
                        onClick={() => history.push("/edit-project")}
                      >
                        Edit
                      </Button>
                    </MenuItem>
                  ) : null}

                  {approvePermission ? (
                    <React.Fragment>
                      <MenuItem onClick={handleClose} dense>
                        <Button
                          disabled={approved ? true : false}
                          color="primary"
                          startIcon={
                            approved ? <CheckCircleIcon /> : <ThumbUpIcon />
                          }
                          variant="text"
                          size="small"
                          onClick={approveProject}
                        >
                          {approved ? "Approved" : "Approve"}
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={handleClose} dense>
                        <Button
                          color="primary"
                          startIcon={<DeleteIcon />}
                          variant="text"
                          size="small"
                          onClick={deleteProject}
                        >
                          Delete
                        </Button>
                      </MenuItem>
                    </React.Fragment>
                  ) : null}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
