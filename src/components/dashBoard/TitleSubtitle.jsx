import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AvatarIcon from '../userProfile/AvatarIcon'

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

export default function TitleSubtitle({selectedProject}) {
  const classes = useStyles();

  return (

    <Grid item xs={12}>
    <Container>
    <div 
    style={{ backgroundColor: "rgba(255,255,255, 0.8)" 
    , borderRadius:5, padding:10, fontWeight:700, color:'black'}}>
    <h1 style={{wordWrap: 'break-word' }}>{selectedProject? selectedProject._source.title:null}</h1>
      <h5 style={{color:'grey'}}>{selectedProject? selectedProject._source.subtitle:null}</h5>
      <AvatarIcon />
    </div>
    </Container>
  </Grid>
  );
}
