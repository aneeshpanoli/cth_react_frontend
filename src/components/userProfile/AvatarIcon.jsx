import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import RedeemIcon from "@material-ui/icons/Redeem";
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams, Link } from "react-router-dom";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { getAnotherUserInfoElastic } from "../backend/AxiosRequest";
import { updateOtherUserData } from "../redux/actions";
import { queryEsById, updateProject } from "../backend/AxiosRequest";
import { updateSelectedProject } from "../redux/actions";
import { MATCH_ID_TITLE } from "../backend/EsQueries";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { parseToDays } from "../js/datePrase";

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
        selectedProject._source.owners,
        dispatch,
        updateOtherUserData
      );
    } else {
      dispatch(updateOtherUserData(null));
    }
  }, []);

  const handleProfile = (event) => {
    history.push("/" + "@" + otherUserData.username);
  };

  const handleClaim = () => {
    if (authData && authData.user) {
      history.push("/claim-project");
    } else {
      history.push("/sign-in");
    }
  };

  const rejectClaim = () => {
    claimProject('projectclaimreject',{
      claimed: "no",
      owners: "",
    });
  };

  const approveClaim = () => {
    claimProject('projectclaimapprove', {
      claimed: "yes",
      owners: selectedProject._source.claimed,
      claimApprovedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const claimProject = (action, es_data) => {
    let data = {
      email:selectedProject._source.proof[1],
      firstName:selectedProject._source.proof[2],
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

  return (
    <Grid container alignItems="center">
      <Grid item xs={3} sm={2} md={1} container justify="flex-end">
        <Button
          disabled={otherUserData ? false : true}
          onClick={handleProfile}
          style={{ borderRadius: 50 }}
        >
          <Avatar
            variant="circle"
            color="secondary"
            className={classes.project}
            alt={otherUserData ? otherUserData.first_name : null}
            src="/static/images/avatar/1.jpg"
          />
        </Button>
      </Grid>
      {selectedProject && otherUserData ? (
        <Grid item xs={9} sm={10} md={11}>
          <div style={{ fontWeight: 400 }}>
            {otherUserData
              ? otherUserData.first_name + " " + otherUserData.last_name
              : "claim this project"}
          </div>

          <div style={{ fontWeight: 400, color: "grey" }}>
            {"Last updated: "+parseToDays(selectedProject._source.updatedAt)}
          </div>
        </Grid>
      ) : null}
      {selectedProject && !otherUserData ? (
        <Grid item xs={9} sm={10} md={11}>
          <Button
            disabled={
              selectedProject._source.claimed !== "no"
                ? true
                : false
            }
            startIcon={<RedeemIcon />}
            disableElevation
            size="small"
            color="primary"
            variant="outlined"
            style={{ textTransform: "none", borderRadius: 25 }}
            onClick={handleClaim}
          >
            {" "}
            {
              selectedProject._source.claimed !== "no"
                ? "Claim pending"
                : "Claim this project"
            }
          </Button>
        </Grid>
      ) : null}

      {authData &&
      authData.user &&
      authData.user.staff === "yes" &&
      !otherUserData &&
      selectedProject._source.claimed !== "no" ? (
        <Grid item xs={9} sm={10} md={11}>
          <Button
            startIcon={<CheckCircleIcon />}
            disableElevation
            size="small"
            color="primary"
            variant="outlined"
            style={{ textTransform: "none", borderRadius: 25 }}
            onClick={() =>approveClaim()}
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
