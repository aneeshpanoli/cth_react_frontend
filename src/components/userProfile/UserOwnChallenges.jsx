import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import ChallengeCard from "./ChallengeCard";

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
  const { userOwnChallenge } = useTrackedState();

  return (
    <React.Fragment>
      {userOwnChallenge
        ? userOwnChallenge.map((r, i) => (
            <Grid item key={i} xs={12} sm={6}>
              <ChallengeCard r={r} />
            </Grid>
          ))
        : null}
    </React.Fragment>
  );
}