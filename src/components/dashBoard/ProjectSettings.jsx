import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import ToolTips from '../menu/ToolTips';
import SettingsIcon from "@material-ui/icons/Settings";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { useHistory } from "react-router-dom";
import { queryEsById, updateProject } from "../backend/AxiosRequest";
import { updateSelectedProject } from "../redux/actions";
import { MATCH_ID_TITLE } from "../backend/EsQueries";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import { esAxios } from '../backend/AxiosRequest'


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  popShare: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    width: "12rem",
  },
  buttonRound: {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "#000",
    },
  },
  buttonIcon: {

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
      params:{
      index:'projects',
      id : props.selectedProject._id 
    }}
    esAxios
    .get(`/d/`, query)
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
  }
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

  return (
    <React.Fragment>
      <IconButton
        disabled={approvePermission || editPermission ? false : true}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.buttonRound}
      >
        
         <ToolTips title="Manage project">
        <SettingsIcon className={classes.buttonIcon} />
        </ToolTips>
        
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
            <React.Fragment>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
                className={classes.popShare}
              >
                {editPermission ? (
                  <MenuItem onClick={handleClose} dense>
                    <Button
                      color="primary"
                      endIcon={<EditIcon />}
                      variant="contained"
                      size="small"
                      onClick={() => history.push("/edit-project")}
                      style={{ marginBottom: 10, marginLeft: 10 }}
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
                      endIcon={approved ? <CheckCircleIcon /> : <ThumbUpIcon />}
                      variant="contained"
                      size="small"
                      onClick={approveProject}
                      style={{ marginBottom: 10, marginLeft: 10 }}
                    >
                      {approved ? "Approved" : "Approve"}
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleClose} dense>
                  <Button
                    color="primary"
                    endIcon={<DeleteIcon /> }
                    variant="contained"
                    size="small"
                    onClick={deleteProject}
                    style={{ marginBottom: 10, marginLeft: 10 }}
                  >
                    Delete
                  </Button>
                </MenuItem>
                </React.Fragment>
                ) : null}
              </MenuList>
            </ClickAwayListener>
            </React.Fragment>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
