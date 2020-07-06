import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderAppBar from '../content/HeaderAppbar'

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

        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}
          >
            <HeaderAppBar >
            <h4>Project discription</h4> 
            </HeaderAppBar>
            {selectedProject? selectedProject._source.storyText:null}</Paper>
        </Grid>
  );
}
