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
  },
}));

export default function Header({selectedProject}) {
  const classes = useStyles();

  return (

        <Grid item xs={12}>
          <Paper className={classes.paper}
          >
            <h1>{selectedProject? selectedProject._source.title:null}</h1>
            {selectedProject? selectedProject._source.subtitle:null}</Paper>
        </Grid>
  );
}
