import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderAppBar from './HeaderAppbar'
import parseHtml from "html-react-parser";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
    wordWrap: 'break-word'

  },
}));

export default function Header({selectedProject}) {
  const classes = useStyles();

  return (

        <Grid item xs={12} sm={12} md={9}>
          <Paper className={classes.paper}
          >
            <HeaderAppBar >
            Project description
            </HeaderAppBar>
            {parseHtml(selectedProject? selectedProject._source.storyText:null)}</Paper>
        </Grid>
  );
}
