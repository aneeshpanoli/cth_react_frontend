import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import Avatar from "@material-ui/core/Avatar";
import StarsIcon from "@material-ui/icons/Stars";
import EditIcon from "@material-ui/icons/Edit";
import { updateOtherUserData, updateAuthData } from "../redux/actions";
import {
  getAnotherUserInfoElastic,
  updateUser,
  getUserInfoElastic,
} from "../backend/AxiosRequest";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { avatarImgs } from "./AvatarImgs";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import LanguageIcon from "@material-ui/icons/Language";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TwitterIcon from "@material-ui/icons/Twitter";

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
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "Gainsboro",
    position: "relative",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { authData, otherUserData } = useTrackedState();
  const [personal, setPersonal] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [avatar, setAvatar] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  React.useEffect(() => {
    setExpanded(!authData._source ? false : false);

    if (authData._id === otherUserData._id) {
      dispatch(
        updateOtherUserData({ ...otherUserData, _source: authData._source })
      );
    }
  }, [authData]);
  React.useEffect(() => {
    setPersonal(
      authData.user &&
        otherUserData &&
        authData.user.id === otherUserData._source.id
    );
    setAvatar(
      otherUserData && otherUserData._source && otherUserData._source.avatar
        ? otherUserData._source.avatar
        : avatarImgs[0]
    );
  }, [otherUserData]);
  const updateFollow = (userData, otherUser, field, op) => {
    let data = {
      status: "followerupdates",
      index: "user_data",
      id: userData._id,
      q: {
        script: {
          source: "ctx._source." + field + "." + op + "(params." + field + ")",
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
      otherUserData === userData ? updateData : null
    );
  };

  const updateUnFollow = (userData, otherUser, field, op) => {
    let data = {
      status: "followerupdates",
      index: "user_data",
      id: userData._id,
      q: {
        script: {
          source:
            "ctx._source." +
            field +
            "." +
            op +
            "(ctx._source." +
            field +
            ".indexOf(params." +
            field +
            "))",
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
      otherUserData === userData ? updateData : null
    );
  };

  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
    let data = {
      status: "userupdates",
      index: "user_data",
      id: authData._id,
      q: {
        doc: {
          avatar: newAvatar,
          lastUpdatedAt: new Date(),
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    const updateData = () =>
      getUserInfoElastic(authData, dispatch, updateAuthData);
    updateUser(
      formData,
      authData.key,
      history,
      authData._source.username,
      updateData
    );
  };

  const updateEditProfile = (newAvatar) => {
    setAvatar(newAvatar);
    let data = {
      status: "userupdates",
      index: "user_data",
      id: authData._id,
      q: {
        doc: {
          about: newAvatar,
          work:"",
          location:"",
          website:"",
          twitter:"",
          lastUpdatedAt: new Date(),
        },
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));

    const updateData = () =>
      getUserInfoElastic(authData, dispatch, updateAuthData);
    updateUser(
      formData,
      authData.key,
      history,
      authData._source.username,
      updateData
    );
  };

  const handleFollow = () => {
    if (!authData || !authData._source) {
      history.push("/sign-in");
      return;
    }
    updateFollow(otherUserData, authData, "followers", "add");
    updateFollow(authData, otherUserData, "following", "add");
  };

  const handleUnfollow = () => {
    updateUnFollow(authData, otherUserData, "following", "remove");
    updateUnFollow(otherUserData, authData, "followers", "remove");
  };

  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={12} sm={12} xs={12} align="center">
          <IconButton onClick={personal ? handleExpandClick : null}>
            <Avatar
              variant="circle"
              color="secondary"
              sizes="5px"
              className={classes.avatar}
              alt={authData.user ? authData.user.first_name : null}
            >
              <img
                src={avatar}
                style={{
                  position: "absolute",
                  width: "5rem",
                  height: "5rem",
                  left: -4,
                  top: 5,
                }}
              />
            </Avatar>
          </IconButton>
          <h4>
            {otherUserData
              ? otherUserData._source.first_name +
                " " +
                otherUserData._source.last_name
              : null}
          </h4>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {avatarImgs.map((avImg, i) => (
              <IconButton
                onMouseOver={() => setAvatar(avImg)}
                onMouseLeave={() => setAvatar(otherUserData._source.avatar)}
                key={i}
                onClick={() => updateAvatar(avImg, otherUserData)}
              >
                <img src={avImg} style={{ width: "2rem", height: "2rem" }} />
              </IconButton>
            ))}
          </Collapse>
        </Grid>

        <Grid item md={12} sm={12} xs={12} align="center">
          {personal ? (
            <React.Fragment>
              <span style={{ color: "grey" }}>
                {authData.user ? authData.user.email : null}
              </span>
              <br />
            </React.Fragment>
          ) : null}
          {otherUserData && otherUserData._source.followers
            ? otherUserData._source.followers.length
            : 0}{" "}
          Followers
          {" . "}
          {otherUserData && otherUserData._source.following
            ? otherUserData._source.following.length
            : 0}{" "}
          Following
        </Grid>
        {/* <Grid item md={12} sm={12} xs={12} align="center">
          <hr></hr>
          <span>
            <InfoOutlinedIcon style={{ marginRight: "0.5rem" }}/>
            CTO/Data Scientist/Engineer/Molecular Geneticist/Stock Trader
          </span>
          <hr></hr>
          <span>
            <WorkOutlineIcon style={{ marginRight: "0.5rem" }} />
            CivicTechHub
          </span>
          <br />
          <span>
            {" "}
            <LocationSearchingIcon /> San Francisco
          </span>
          <br />
          <span>
            {" "}
            <a href="http://www.aneeshpanoli.com" target="_blank">
              <LanguageIcon /> aneeshpanoli.com
            </a>
          </span>
          <br />
          <span>
            <a href="https://twitter.com/aneeshpanoli" target="_blank">
              <TwitterIcon /> aneeshpanoli
            </a>
          </span>
        </Grid> */}
        {personal ? (
          <Grid item md={12} sm={12} xs={12} align="center">
            {/* <Button
              startIcon={<EditIcon />}
              disableElevation
              size="small"
              color="default"
              variant="contained"
              style={{ textTransform: "none", borderRadius: 25 }}
              onClick={handleFollow}
            >
              Edit profile
            </Button> */}
          </Grid>
        ) : (
          <Grid item md={12} sm={12} xs={12} align="center">
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
                otherUserData._source.followers &&
                otherUserData._source.followers.includes(authData._source.email)
                  ? handleUnfollow
                  : handleFollow
              }
            >
              {" "}
              {otherUserData &&
              authData._source &&
              otherUserData._source.followers &&
              otherUserData._source.followers.includes(authData._source.email)
                ? "Unfollow"
                : "Follow"}
            </Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}
