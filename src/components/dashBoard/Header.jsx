import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 200
  },
}));

export default function Header({selectedProject}) {
  const classes = useStyles();

  return (
        
        <Grid item xs={12}>
          {selectedProject? 
          <Paper className={`${classes.paper} dash-header-div`} 
          style={{backgroundImage: "url(" + selectedProject._source.image + ")"}}
          ></Paper>
          :
          null
        }
        </Grid>
  );
}
