import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useTrackedState } from 'reactive-react-redux';
import { parseToDays } from '../js/datePrase'

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

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { challengeFormData } = useTrackedState();
  // console.log(challengeFormData);
  let options = { dateStyle:'long', timeStyle:'long'};


  return (
    <Card className={classes.root}>
      <CardContent>
        <h5>Preview</h5>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {challengeFormData.primeArea}
        </Typography>
        <Typography variant="h6" component="h6">
        {challengeFormData.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        {'Deadline: ' + challengeFormData.deadLine.toLocaleString('default', options)}
        <br/>
        {'Created: ' + parseToDays(challengeFormData.createdDate.toLocaleString())}
        </Typography>
        <Typography variant="body2" component="p">
        {challengeFormData.description}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
