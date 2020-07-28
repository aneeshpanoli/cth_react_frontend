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
import UserActivity from './UserActivity'
import { useParams, useHistory } from "react-router-dom";
import { getAnotherUserInfoElastic } from "../backend/AxiosRequest";
import { updateOtherUserData } from "../redux/actions";

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
  const { authData, otherUserData } = useTrackedState();
  React.useEffect(() =>{
    getAnotherUserInfoElastic(
      authData,
      "username",
      params.user,
      dispatch,
      updateOtherUserData
    );
  }, [params.user])

  const getUserOwnChallenges = () => {
    if(otherUserData&&otherUserData._source.id){
    let query = MATCH(
        otherUserData._source.id, 'owners'
        );
        simpleQueryElasticsearch(query, dispatch, updateUserOwnChallenge);
    }
  };

  React.useEffect(() =>getUserOwnChallenges(), [otherUserData])


  return (
    
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={3}>
          <Header onClick={null} username={params.user} />
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
        <Grid container spacing={2}>
        <UserOwnChallenges/>
        </Grid>
       
       
        <UserActivity />
      </Grid>
      </Grid>
  );
}
