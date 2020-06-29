import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateSelectedChallenge } from  '../redux/actions'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ChallengeCard({r}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  let options = { dateStyle:'long', timeStyle:'long'};
  const history = useHistory();
  const dispatch = useDispatch();
  const [checked] = useState(true);

  const handleMoreClick = () => {
    dispatch(updateSelectedChallenge(r));
    history.push("/challenge/"+r._id);
  };


  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {r._source.primeArea}
        </Typography>
        <Typography variant="h6" component="h6">
        {r._source.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {'Deadline: ' + new Date(r._source.deadLine).toLocaleString('default', options)}
        </Typography>
        <Typography variant="body2" component="p">
        {r._source.description}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleMoreClick}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
