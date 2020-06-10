import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import React from 'react';
import ApproveCard from  './approveCard'




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
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
          <div ><h2>{selectedProject._source.title}</h2>
            <h2>Activity</h2></div>
            

        </Grid>
        <Grid item xs={12}>
          <ApproveCard />
        </Grid>

      </Grid>
    </div>
  );
}else{
      return (
          <div>Loading...</div>
      )
    }
}
