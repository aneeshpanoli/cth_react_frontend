import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import Avatar from "@material-ui/core/Avatar";
import StarsIcon from "@material-ui/icons/Stars";
import EditIcon from "@material-ui/icons/Edit";
import { updateOtherUserData } from "../redux/actions";
import { getAnotherUserInfoElastic, updateUser } from "../backend/AxiosRequest";
import { ADD_TO_ARRAY } from '../backend/EsQueries'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    alignContent: "right",
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 100,
    backgroundColor: "grey",
  },
  project: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    fontWeight: 700,
    fontSize: "3rem",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { authData, otherUserData, selectedProject } = useTrackedState();
  const [personal, setPersonal] = React.useState(true);
  // console.log(authData);
  React.useEffect(() => {
    setPersonal(
      authData.user &&
        otherUserData &&
        authData.user.id == otherUserData._source.id
    );
  }, [otherUserData, authData]);

  const handleFollow = () => {
    if(!authData || !authData._source){
      history.push('/sign-in')
      return
    }
    updateFollow(otherUserData, authData, "followers", "add");
    updateFollow(authData, otherUserData, "following", "add");
    
  };

  const handleUnfollow = () => {
    updateUnFollow(authData, otherUserData, "following", "remove");
    updateUnFollow(otherUserData, authData, "followers", "remove");
  };

  const updateFollow= (userData, otherUser, field, op) => {
    let data = {
      status: "followerupdates",
      index: "user_data",
      id: userData._id,
      q: {
        script: {
          source: "ctx._source." + field + "."+op+"(params." + field + ")",
          lang: "painless",
          params: {
            [field]: otherUser._source.email,
          },
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    const updateData = () =>
      getAnotherUserInfoElastic(
        authData,
        "id",
        userData._source.id,
        dispatch,
        updateOtherUserData
      );
    updateUser(
      formData,
      authData.key,
      history,
      otherUserData._source.username,
      otherUserData===userData?updateData:null
    );
  };

  const updateUnFollow = (userData, otherUser, field, op) => {
    let data = {
      status: "followerupdates",
      index: "user_data",
      id: userData._id,
      q: {
        script: {
          source: "ctx._source." + field + "."+op+"(ctx._source."+ field + ".indexOf(params." + field + "))",
          lang: "painless",
          params: {
            [field]: otherUser._source.email,
          },
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    const updateData = () =>
      getAnotherUserInfoElastic(
        authData,
        "id",
        userData._source.id,
        dispatch,
        updateOtherUserData
      );
    updateUser(
      formData,
      authData.key,
      history,
      otherUserData._source.username,
      otherUserData===userData?updateData:null
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={2} sm={4} xs={3} container justify="flex-end">
          <Avatar
            variant="circle"
            color="secondary"
            className={classes.project}
            // alt={authData.user ? authData.user.first_name : null}
            src="/static/images/avatar/1.jpg"
          />
        </Grid>

        <Grid item md={10} sm={8} xs={9} container justify="flex-start">
          <h4>
            {otherUserData
              ? otherUserData._source.first_name +
                " " +
                otherUserData._source.last_name
              : null}
          </h4>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          {personal ? (
            <React.Fragment>
              <span style={{ color: "grey" }}>
                {authData.user ? authData.user.email : null}
              </span>
              <br />
            </React.Fragment>
          ) : null}
          {otherUserData ? otherUserData._source.followers.length : 0} Followers
          <br />
          {otherUserData ? otherUserData._source.following.length : 0} Following
        </Grid>
        {personal ? (
          <Grid item md={12} sm={12} xs={12}>
            <Button
              startIcon={<EditIcon />}
              disableElevation
              size="small"
              color="default"
              variant="contained"
              style={{ textTransform: "none", borderRadius: 25 }}
              onClick={handleFollow}
            >
              Edit profile
            </Button>
          </Grid>
        ) : (
          <Grid item md={12} sm={12} xs={12}>
            <Button
              startIcon={<StarsIcon />}
              disableElevation
              size="small"
              color="default"
              variant="contained"
              style={{ textTransform: "none", borderRadius: 25 }}
              onClick={
                otherUserData &&
                authData._source &&
                otherUserData._source.followers.includes(authData._source.email)
                  ? handleUnfollow
                  : handleFollow
              }
            >
              {" "}
              {otherUserData &&
              authData._source &&
              otherUserData._source.followers.includes(authData._source.email)
                ? "Unfollow"
                : "Follow"}
            </Button>
          </Grid>
        )}
      </Grid>

      {/* <Paper className={classes.paper} elevation={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: "pointer" }}
                ></Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: "pointer" }}
                ></Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">--</Typography>
            </Grid>
            <Grid container justify="space-between">
              <Grid item>Followers, following, Projects, solving</Grid>
            </Grid>
            <hr />
            <Grid container alignItems="flex-end">
              <Grid item>
                <UserProfileMenu />
              </Grid>
              <Grid>
                <GreyRoundButton onClick={props.onClick}>
                  My Projects
                </GreyRoundButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper> */}
    </React.Fragment>
  );
}
