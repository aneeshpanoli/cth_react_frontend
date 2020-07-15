import { useDispatch, useTrackedState } from 'reactive-react-redux';
import React, { useEffect, useRef } from 'react';
import { MATCH_ID_TITLE } from '../backend/EsQueries'
import { useParams, useHistory} from 'react-router-dom'
import { queryEsById } from '../backend/AxiosRequest'
import { updateSelectedProject } from '../redux/actions'


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './Header'
import SubTitle from './SubTitle'
import StoyText from './StoryText'
import ProjectLinks from './ProjectLinks'
import ProjectVideo from './ProjectVideo'
import ProjectTech from './ProjectTech'
import Comments from './Comments'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const history = useHistory();
  const { selectedProject, authData } = useTrackedState();
  let params = useParams();
  const dispatch = useDispatch();
  useEffect(() =>{

    if (!selectedProject){
      // replace - with space
        let query = MATCH_ID_TITLE(params.id, params.name.replace(/-/g, ' '));
        queryEsById(query, dispatch, updateSelectedProject, history);
    }
}, []);


  return (
    <div className={classes.root}>
      {selectedProject?
      <Grid container spacing={3}>
        <Header selectedProject={selectedProject}/>
        {/* <SubTitle selectedProject={selectedProject}/> */}
        <StoyText selectedProject={selectedProject}/>
        <Grid container spacing={1} alignItems='flex-start' item  sm={3} md={3} xs={12}>
        <ProjectLinks selectedProject={selectedProject}/>
        <ProjectVideo selectedProject={selectedProject}/>
        <ProjectTech selectedProject={selectedProject}/>
        </Grid>
        
        <Grid item sm={12} xs={12}>
          <Paper className={classes.paper}>
          <h4>Comments</h4>
          {authData.isAuthenticated?
          <Comments projId={params.id}/>
            :
            <h5>Please sign in to post comments</h5>}
          </Paper>
        </Grid>
      </Grid>
      :
      null}
    </div>
  );
}
