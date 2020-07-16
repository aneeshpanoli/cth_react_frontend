import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { updateUserInfo, updateAuthData } from "../redux/actions";
import { retriveSessionStore } from "../localStore/session";
import UserProfileMenu from "../menu/UserProfileMenu";
import GreyRoundButton from "../buttons/GreyRounded";
import Icon from "../../Assets/img/user.png";
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
}));

export default function Header(props) {
  const classes = useStyles();
  const { authData } = useTrackedState();
  // console.log(userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authData.user) {
      retriveSessionStore("authData", dispatch, updateUserInfo);

    }
  }, []);

  return (
    <React.Fragment>
      <div style={{height:'1rem'}}></div>
    <Grid container spacing={0} alignContent='space-between'>
      <Grid item sm={2} xs={5}>
            <img
              className={classes.image}
              alt="complex"
              src={Icon}
              className={classes.image}
            />
          </Grid>

          <Grid item xs={7} sm={2} >
            <Typography gutterBottom variant="subtitle1" >
              {authData.user ? authData.user.first_name + " " + authData.user.last_name : null}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Associate @Some Org
            </Typography>

            <Typography variant="body2" color="textSecondary">
              ID: 1030114
            </Typography>
          </Grid>

    </Grid>

    


      <div style={{ height: "1rem" }}></div>

      <Paper className={classes.paper} elevation={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">--</Typography>
            </Grid>
            <Grid container justify="space-between">
              <Grid item>Followers, Likes, Projects, solving</Grid>
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
      </Paper>
    </React.Fragment>
  );
}
