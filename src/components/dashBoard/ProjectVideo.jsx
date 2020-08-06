import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderAppBar from './HeaderAppbar'
import ReactPlayer from 'react-player'


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

            {selectedProject && selectedProject._source.video? 
            <ReactPlayer width="100%" url={selectedProject._source.video} />
            :
            "This project has no videos"}
        </Grid>
  );
}
