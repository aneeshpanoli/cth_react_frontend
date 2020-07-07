import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderAppBar from './HeaderAppbar'

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

        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}
          >
            <HeaderAppBar >
            Tech Stack 
            </HeaderAppBar>
            {selectedProject && selectedProject._source.builtWith[0]? 
            selectedProject._source.builtWith
            :
            "This project has no videos"}</Paper>
        </Grid>
  );
}
