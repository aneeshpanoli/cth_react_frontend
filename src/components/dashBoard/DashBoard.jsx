import { useDispatch, useTrackedState } from 'reactive-react-redux';
import React, { useEffect, useRef } from 'react';
import { MATCH_ID } from '../backend/EsQueries'
import { useParams} from 'react-router-dom'
import { queryEsById } from '../backend/AxiosRequest'
import { updateSelectedProject } from '../redux/actions'


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './Header'
import SubTitle from './SubTitle'
import StoyText from './StoryText'

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

export default function CenteredGrid() {
  const classes = useStyles();
  const { selectedProject } = useTrackedState();
  let params = useParams();
  const dispatch = useDispatch();
  useEffect(() =>{

    if (!selectedProject){
        let query = MATCH_ID(params.id);
        queryEsById(query, dispatch, updateSelectedProject);
    }
}, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Header selectedProject={selectedProject}/>
        {/* <SubTitle selectedProject={selectedProject}/> */}
        <StoyText selectedProject={selectedProject}/>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
