import React from "react";
import Grid from "@material-ui/core/Grid";
import { useTrackedState } from "reactive-react-redux";
import ProjectCard from "../search/ProjectCard";


export default function UserOwnChallenge() {
  const { userOwnChallenge } = useTrackedState();

  return (
    <React.Fragment>
      {userOwnChallenge
        ? userOwnChallenge.map((r, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <ProjectCard r={r} />
            </Grid>
          ))
        : null}
    </React.Fragment>
  );
}
