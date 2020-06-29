import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
    borderRadius:100,
    fontWeight: 700,
    bottom: -40,
  },
}));

export default function GreyRounded(props) {
  const classes = useStyles();
  return (
      <Button
        aria-controls="customized-menu"
        color="primary"
        variant="contained"
        onClick={props.onClick? (e) => props.onClick(e):null}
        className={classes.button}
      >
        {props.children}
      </Button>

  );
}
