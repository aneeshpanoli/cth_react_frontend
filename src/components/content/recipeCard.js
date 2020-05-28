import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Row from 'react-bootstrap/Row';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { Link } from "react-router-dom";
import { updateSelectedRecipe } from '../redux/actions'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "10px"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
    backgroundColor: red[500],
  },
}));



export default function RecipeCard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked] = useState(true);
  const { searchRecipeList } = useTrackedState()

  const handleExpandClick = (selectedRecipe) => {
    dispatch(updateSelectedRecipe(selectedRecipe));
    console.log("sliding...")
  };

  return (
    <Row className="justify-content-center">
    {searchRecipeList.map(r => 
    <Fade in={checked} key={r._id} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={r._source.title}
        subheader="Archana's Kitchen"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {r._source.ingredients.join(', ')}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
        <IconButton
          className={clsx(classes.expand)}
          onClick={() => handleExpandClick(r)}
          aria-label="show more"
        >
          <Link to="/dashboard">
          <ExpandMoreIcon />
          </Link>
        </IconButton>
        
      </CardActions>
      
    </Card>
    </Fade>
  )}
    </Row>
  );
}
