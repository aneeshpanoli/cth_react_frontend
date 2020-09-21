import React from "react";
import Grid from "@material-ui/core/Grid";
import { useTrackedState } from "reactive-react-redux";
import ProjectCard from "../home/ProjectCard";
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'


export default function UserOwnChallenge() {
  const { userOwnChallenge } = useTrackedState();
  const history = useHistory()

  return (
    <React.Fragment>
      
      <Grid item xs={12} sm={12} md={12}>
      {userOwnChallenge&&userOwnChallenge.length
        ? 
              <h3>Owned projects</h3>
            :<p><h3>No owned projects</h3><p>
              <Button variant="contained" onClick={()=> history.push('/create-project')}> Create a project</Button>
              </p></p>}</Grid>
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
