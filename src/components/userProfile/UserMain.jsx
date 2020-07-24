import Header from "./Header";

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import UserOwnChallenges from "./UserOwnChallenges";
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateUserOwnChallenge } from '../redux/actions'
import { simpleQueryElasticsearch } from '../backend/AxiosRequest'
import { MATCH } from '../backend/EsQueries'
import CalenderHeatmap from './CalenderHeatmap'
import { useParams, useHistory } from "react-router-dom";


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

export default function UserMain() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params.user);
  const { authData, userOwnChallenge } = useTrackedState();
  const getUserOwnChallenges = () => {
    let query = MATCH(
        authData.user.id, 'owners'
        );
        simpleQueryElasticsearch(query, dispatch, updateUserOwnChallenge);
  };
  React.useEffect(() => {if(!userOwnChallenge&&authData.user){getUserOwnChallenges()}}, [])

  return (
    
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header onClick={null} />
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
        <CalenderHeatmap />
      </Grid>
    </div>
  );
}
