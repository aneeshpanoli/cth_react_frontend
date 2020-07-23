import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import HeaderAppBar from './HeaderAppbar'
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import { NavigationFullscreen } from 'material-ui/svg-icons';


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
    selectedProject._source.url?all_links.push(selectedProject._source.url):null;
    console.log(all_links)
    const elements = []
    let newUrl;
    all_links.forEach(element => {
      try {
       newUrl = new URL(element).hostname.slice(0, 31)
     } catch (error) {
      newUrl= null
     }
     newUrl?elements.push(
      <Button key={element} startIcon={<LinkIcon/>}
      target="_blank" 
      size='small' href={element}
      style={{margin:5}}
      >
       { newUrl}
       
        </Button>):null
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
