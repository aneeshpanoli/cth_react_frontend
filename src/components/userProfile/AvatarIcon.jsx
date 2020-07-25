import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import RedeemIcon from '@material-ui/icons/Redeem';
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams, Link } from "react-router-dom";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { getAnotherUserInfoElastic } from "../backend/AxiosRequest";
import { updateOtherUserData } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  small: {
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
            className={classes.small}
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
            {selectedProject._source.createdAt}
          </div>
        </Grid>
      ) : (
        <Grid item xs={9} sm={10} md={11}>
          <Button
          startIcon={<RedeemIcon />}
          disableElevation
          size='small'
            color="primary"
            variant="outlined"
            style={{ textTransform: "none", borderRadius: 25 }}
          >
            {" "}
            Claim this project
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
