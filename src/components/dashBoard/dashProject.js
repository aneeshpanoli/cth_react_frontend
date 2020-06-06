import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import React from 'react';
import Button from '@material-ui/core/Button';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    
  },

}));

export default function DashProject() {
  const classes = useStyles();
  const { selectedProject } = useTrackedState();
    if (selectedProject){
  return (

    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}  component="div" ><h2>{selectedProject._source.title}</h2>
          <Button variant="contained" color="primary">
        Join Project
      </Button>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper} elevation={0}>{selectedProject._source.storyText}</Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper} elevation={0}>{selectedProject._source.links.join("\n ")}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={0}>{selectedProject._source.builtWith.join(", ")}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>{selectedProject._source.country}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );}else{
      return (
          <div>Loading...</div>
      )
    }
}
