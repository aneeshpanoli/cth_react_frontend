import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Lets make your work impactful
        </Typography>
        <Typography variant="h5" component="h2">
         Microtask
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        A new way of making progress
        </Typography>
        <Typography variant="body2" component="p">
        Tasks that don't take more than hour from start to finish.

        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth color='secondary'>Add a microtask</Button>
      </CardActions>
    </Card>
  );
}
