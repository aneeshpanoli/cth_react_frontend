import Header from "./Header";
import React from "react";
import Grid from "@material-ui/core/Grid";
import UserOwnChallenges from "./UserOwnChallenges";
import UserLikedProjects from "./UserLikedProjects";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { updateUserOwnChallenge } from "../redux/actions";
import { simpleQueryElasticsearch } from "../backend/AxiosRequest";
import { MATCH } from "../backend/EsQueries";
import UserActivity from "./UserActivity";
import { useParams } from "react-router-dom";
import { getAnotherUserInfoElastic } from "../backend/AxiosRequest";
import { updateOtherUserData } from "../redux/actions";
import { fbSignin } from "../backend/AxiosRequest";
import Button from "@material-ui/core/Button";
import { updateAuthData } from "../redux/actions";

export default function UserMain() {
  const dispatch = useDispatch();
  const params = useParams();
  // console.log(params.user);
  const { authData, otherUserData } = useTrackedState();
  const [userExist, setUserExist] = React.useState(true);

  React.useEffect(() => {
    getAnotherUserInfoElastic(
      authData,
      "username",
      params.user,
      dispatch,
      updateOtherUserData
    );
  }, [params.user]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setUserExist(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const getUserOwnChallenges = () => {
    if (otherUserData && otherUserData._source.id) {
      let query = MATCH(otherUserData._source.id, "owners", 100);
      simpleQueryElasticsearch(query, dispatch, updateUserOwnChallenge);
    }
  };

  React.useEffect(() => {
    getUserOwnChallenges();
  }, [otherUserData]);

  return (
    <React.Fragment>
      {otherUserData ? (
        <Grid container spacing={3} style={{ marginTop: "1rem" }}>
          <Grid item xs={12} sm={12} md={3}>
            <Header username={params.user} />
            {/* {authData &&
            authData.user &&
            authData._source.staff === "yes" &&
            params.user === "aneesh" ? (
              <Button onClick={sSignIn}>Siginin Test</Button>
            ) : null} */}
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Grid container spacing={2}>
              <UserOwnChallenges />
              <UserLikedProjects
                userId={otherUserData._source.id}
                fieldName="upvotes"
              />
              <UserLikedProjects
                userId={otherUserData._source.id}
                fieldName="bookmarks"
              />
            </Grid>
            <hr></hr>
            <UserActivity />
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={3}>
          {!userExist ? <h3> User doesnt exist</h3> : null}
        </Grid>
      )}
    </React.Fragment>
  );
}
