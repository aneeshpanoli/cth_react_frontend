import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderAppBar from './HeaderAppbar'
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    wordWrap: 'break-word'
  },
}));

export default function Header({selectedProject}) {
  const classes = useStyles();

  const renderLinks = () => {
    const all_links = [...selectedProject._source.links];
    all_links.push(selectedProject._source.url)
    const elements = []
    all_links.forEach(element => {
      elements.push(
      <Button key={element} startIcon={<LinkIcon/>}
      target="_blank" 
      size='small' href={element}
      style={{margin:5}}
      >
        {new URL(element).hostname.slice(0, 31)}
        </Button>)
    });
    return elements;
  }

  return (

        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}
          >
            <HeaderAppBar >
            Links 
            </HeaderAppBar>
            {selectedProject && selectedProject._source.links? 
              renderLinks()
            :
            "This project has no links"}</Paper>
        </Grid>
  );
}
