import Header from "./Header";
import React from "react";
import Grid from "@material-ui/core/Grid";
import UserOwnChallenges from "./UserOwnChallenges";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { updateUserOwnChallenge } from "../redux/actions";
import { simpleQueryElasticsearch } from "../backend/AxiosRequest";
import { MATCH } from "../backend/EsQueries";
import UserActivity from "./UserActivity";
import { useParams } from "react-router-dom";
import { getAnotherUserInfoElastic } from "../backend/AxiosRequest";
import { updateOtherUserData } from "../redux/actions";
import { socialSignIn, fbSignin } from "../backend/AxiosRequest";
import Button from "@material-ui/core/Button";
import { updateAuthData } from "../redux/actions";


export default function UserMain() {
  const token = "EAAcfvKwoe9kBAMcLnkPYfSFE1jvHRczhPkINg4wFuO8N9yfeDLEYqo4ZCRcWBhbirEraYzjmGgsfDboLBJy4CF2UndMPSGGaQ7mafZBU8ZC6QNmxvvpEMl2eUfRE4Le19237yWEkc5GM4nsOtVWDNKfC0634yE46DkBisDuMgXFq1WqvZBq7ZAiprat3a7FosvET8OqT1zAZDZD"
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params.user);
  const { authData, otherUserData } = useTrackedState();

  const sSignIn = () => {
    fbSignin(token,authData,dispatch,updateAuthData)
  }
  React.useEffect(() => {
    getAnotherUserInfoElastic(
      authData,
      "username",
      params.user,
      dispatch,
      updateOtherUserData
    );
  }, [params.user]);

  const getUserOwnChallenges = () => {
    if (otherUserData && otherUserData._source.id) {
      let query = MATCH(otherUserData._source.id, "owners");
      simpleQueryElasticsearch(query, dispatch, updateUserOwnChallenge);
    }
  };

  React.useEffect(() => getUserOwnChallenges(), [otherUserData]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={3}>
        <Header onClick={null} username={params.user} />
        {authData && authData.user && authData._source.staff === "yes" &&params.user==="aneesh"?
      <Button onClick={sSignIn}>
        Siginin Test
      </Button>:null}
      </Grid>
      <Grid item xs={12} sm={12} md={9}>
        <Grid container spacing={2}>
          <UserOwnChallenges />
        </Grid>

        <UserActivity />
      </Grid>
    </Grid>
  );
}
