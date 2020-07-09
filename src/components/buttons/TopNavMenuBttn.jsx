import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: '3rem',
    width: '15rem',
  },
}));

export default function TopNavMenuBttn(props) {
  const classes = useStyles();

  return (
    <Button
    variant="contained"
    color="secondary"
    className={classes.button}
    startIcon={props.startIcon}
    onClick={props.onClick} 
  >
    {props.children}
  </Button>
  );
}
