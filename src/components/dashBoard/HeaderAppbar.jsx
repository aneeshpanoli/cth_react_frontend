import React from 'react';
import { makeStyles } from '@material-ui/core/styles';





const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    height:30,
    borderRadius:5,
    color:'white',
    verticalAlign:'middle',
    textAlign:'center',
    lineHeight:4,
    margin:10
  },
}));

export default function NavTabs(props) {
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <h5 style={{textTransform:'uppercase'}}>{props.children}</h5>
      </div>

      
  );
}
