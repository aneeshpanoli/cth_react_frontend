import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import RedeemIcon from "@material-ui/icons/Redeem";
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { getAnotherUserInfoElastic } from "../backend/AxiosRequest";
import { updateOtherUserData } from "../redux/actions";
import { queryEsById, updateProject } from "../backend/AxiosRequest";
import { updateSelectedProject } from "../redux/actions";
import { MATCH_ID_TITLE } from "../backend/EsQueries";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { parseToDays } from "../js/datePrase";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  project: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    fontWeight: 700,
  },
  paper: {
    marginRight: theme.spacing(3),
  },
}));

export default function AvatarIcon() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { selectedProject, otherUserData, authData } = useTrackedState();

  const classes = useStyles();

  React.useEffect(() => {
    //   console.log(otherUserData)
    // console.log(authData)
    // console.log(selectedProject)
    if (selectedProject && selectedProject._source.owners) {
      getAnotherUserInfoElastic(
        authData,
        "id",
        selectedProject._source.owners,
        dispatch,
        updateOtherUserData
      );
    } else {
      dispatch(updateOtherUserData(null));
    }
  }, []);
  const claimProject = (action, es_data) => {
    let data = {
      email: selectedProject._source.proof[1],
      firstName: selectedProject._source.proof[2],
      status: action,
      index: selectedProject._index,
      id: selectedProject._id,
      q: es_data,
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    let query = MATCH_ID_TITLE(
      selectedProject._id,
      selectedProject._source.title.replace(/-/g, " ")
    );
    const updateData = () =>
      queryEsById(query, dispatch, updateSelectedProject, history);
    updateProject(
      formData,
      authData.key,
      history,
      selectedProject._source.title,
      updateData
    );
  };
  const handleProfile = (event) => {
    history.push("/@" + otherUserData._source.username);
  };

  const handleClaim = () => {
    if (authData && authData.user) {
      history.push("/claim-project");
    } else {
      history.push("/sign-in");
    }
  };

  const rejectClaim = () => {
    claimProject("projectclaimreject", {
      claimed: "no",
      owners: "",
    });
  };

  const approveClaim = () => {
    claimProject("projectclaimapprove", {
      claimed: "yes",
      owners: selectedProject._source.claimed,
      claimApprovedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <Grid container alignItems="center" style={{ marginBottom: "10%" }}>
      <Grid item xs={3} sm={2} md={2} align="right">
        <Button
          disabled={otherUserData ? false : true}
          onClick={handleProfile}
          style={{ borderRadius: 50 }}
        >
          <Avatar
            variant="circle"
            color="secondary"
            className={classes.project}
            alt={otherUserData ? otherUserData._source.first_name : null}
          >
            {otherUserData &&
            otherUserData._source &&
            otherUserData._source.avatar ? (
              <img
                src={otherUserData._source.avatar}
                style={{
                  position: "absolute",
                  width: "3rem",
                  height: "3rem",
                  left: -4,
                  top: 5,
                }}
              />
            ) : null}
          </Avatar>
        </Button>
      </Grid>
      {selectedProject && otherUserData ? (
        <Grid item xs={9} sm={10} md={10} align="left">
          <div style={{ fontWeight: 400 }}>
            {otherUserData
              ? otherUserData._source.first_name +
                " " +
                otherUserData._source.last_name
              : "claim this project"}
          </div>

          <div style={{ fontWeight: 400, color: "grey" }}>
            {"Last updated: " + parseToDays(selectedProject._source.updatedAt)}
          </div>
        </Grid>
      ) : null}
      {selectedProject && !otherUserData ? (
        <Grid item xs={9} sm={10} md={10} align="left">
          <Button
            disabled={selectedProject._source.claimed !== "no" ? true : false}
            startIcon={<RedeemIcon />}
            disableElevation
            size="small"
            color="primary"
            variant="outlined"
            style={{ textTransform: "none", borderRadius: 25 }}
            onClick={handleClaim}
          >
            {" "}
            {selectedProject._source.claimed !== "no"
              ? "Claim pending"
              : "Claim this project"}
          </Button>
        </Grid>
      ) : null}

      {authData &&
      authData._source &&
      authData._source.staff === "yes" &&
      !otherUserData &&
      selectedProject._source.claimed !== "no" ? (
        <Grid item xs={9} sm={10} md={10} align="left">
          <Button
            startIcon={<CheckCircleIcon />}
            disableElevation
            size="small"
            color="primary"
            variant="outlined"
            style={{ textTransform: "none", borderRadius: 25 }}
            onClick={() => approveClaim()}
          >
            {" "}
            Approve claim
          </Button>
          <Button
            startIcon={<ThumbDownAltIcon />}
            disableElevation
            size="small"
            color="default"
            variant="contained"
            style={{ textTransform: "none", borderRadius: 25 }}
            onClick={rejectClaim}
          >
            {" "}
            Reject claim
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
}
