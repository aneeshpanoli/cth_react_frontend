import React from 'react';
import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    height:40,
    borderRadius:3,
    color:'white',
    align:'center'
  },
}));

export default function NavTabs(props) {
  const classes = useStyles();

  return (
      <div className={classes.root}>
          {props.children}
      </div>

      
  );
}
