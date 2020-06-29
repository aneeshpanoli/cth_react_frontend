import Header from "./Header";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import UserOwnChallenges from "./UserOwnChallenges";
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateUserOwnChallenge } from '../redux/actions'
import { queryEsChallenges } from '../backend/AxiosRequest'
import { MATCH_USER_EMAIL } from '../backend/EsQueries'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo } = useTrackedState();
  const getUserOwnChallenges = () => {
    let query = MATCH_USER_EMAIL(
        userInfo.email, 'owners'
        );
        queryEsChallenges(query, dispatch, updateUserOwnChallenge);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header onClick={getUserOwnChallenges} />
        </Grid>
        <UserOwnChallenges />
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
