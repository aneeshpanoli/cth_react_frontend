
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginButton from '../buttons/LoginButton';
import AvararButton from '../buttons/AvatarButton';
import { useTrackedState} from 'reactive-react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 35,
    verticalAlign: "top",
    justifyContent: "flex-end",
    width: '100%'
  },

}));

export default function TopNavAvatarLogin() {
  const { authData } = useTrackedState();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  // console.log(authData);
  const classes = useStyles();

  React.useEffect(() => {
    setIsAuthenticated(authData.isAuthenticated);
   }, [authData]);
  

  return (
    <div className={classes.root}>
      {isAuthenticated?
    <AvararButton />
  :
     <LoginButton />
    }
  </div>
  );
}


