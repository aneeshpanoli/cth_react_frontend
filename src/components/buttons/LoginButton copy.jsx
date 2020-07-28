import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { useHistory } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import SignInOptions from '../auth/SignInIptions'




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    history.push('/sign-in')
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  



  return (
    <div>
      <Button color="secondary"  onClick={handleClickOpen}>
        <LockOutlinedIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {signIn ?
        // <SignIn signUp={() => setSignIn(false)}/>
        <SignInOptions signUp={() => setSignIn(false)}/>
        :
        <SignUp signIn={() => setSignIn(true)}/>
        }
      </Dialog>
    </div>
  );
}
