import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import LongMenu from '../menu/LongMenu';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateSelectedProject } from '../redux/actions'
import { useHistory, useParams, Link} from "react-router-dom";
import Flag from 'react-world-flags'
import CardActionArea from '@material-ui/core/CardActionArea';
import { countries } from './utils';

function countryToIso(country){
   let filteredData = countries.filter(d => d.label === country);
   return filteredData[0].code;
}



const useStyles = makeStyles((theme) => ({
  root: {
     width: '98%',
    height: '98%',
  },
  media: {
    height: 0,
    paddingTop: '50%', // 16:9
  },
  expand: {
    transform: 'rotate(-90deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: 'rotate(-90deg)',
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    top: '56.25%',
    left: '1.2rem',
    color: 'black',
    backgroundColor: 'transparent'
 },
}));



export default function ProjectCard({r}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked] = useState(true);
  // console.log(r)
  const handleExpandClick = (selectedProject) => {
    dispatch(updateSelectedProject(selectedProject));
    history.push("/"+selectedProject._source.title.replace(/\s+/g, '-')+"/"+selectedProject._id);
  };
  

  return (
    <Fade in={checked} key={r._id} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
    <Card className={classes.root} >
      <CardHeader
      title={r._source.title}
      subheader={r._source.hackathons[0]?r._source.hackathons[0]:null}
        avatar={
          <Avatar title={r._source.country} aria-label="project" className={classes.avatar} 
         >
            <Flag code={ countryToIso(r._source.country)} height="35"/>
          </Avatar>
        }
        action={
          
        <LongMenu r={r}/>
        }
        
      />
       
      <CardMedia
        className={classes.media}
        image={r._source.image}
        title=""
      > </CardMedia>
      <div className={classes.overlay}>
    
      </div>
     
      <CardContent title="Short description">
        <Typography variant="body2" color="textSecondary" 
        component="div" 
        style={{overflow:'hidden'}}>
        {r._source.subtitle.substring(0, 125)+"..."}
        <br></br>
        <Button size="small" onClick={() => handleExpandClick(r)}>Learn More</Button>
        </Typography>
      </CardContent>
      {/* <CardActionArea onClick={() => handleExpandClick(r)}>
      </CardActionArea>
      <CardActions>
      <Button size="small" onClick={() => handleExpandClick(r)}>Learn More</Button>
        <IconButton>
         <a href={r._source.url}><OpenInNewIcon aria-label="open new" title="Open Link"/></a> 
        </IconButton>
        <IconButton
          onClick={() => handleExpandClick(r)}
          aria-label="show more" title="Project details"
        >
          <DashboardIcon />
        </IconButton>
        
      </CardActions> */}
      
    </Card>
    </Fade>
  );
}


 