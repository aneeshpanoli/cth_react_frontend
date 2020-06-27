import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import Slide from '@material-ui/core/Slide';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp'




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [signIn, setSignIn] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  


  return (
    <div>
      <Button color="primary"  onClick={handleClickOpen}>
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
        <SignIn signUp={() => setSignIn(false)}/>
        :
        <SignUp signIn={() => setSignIn(true)}/>
        }
      </Dialog>
    </div>
  );
}