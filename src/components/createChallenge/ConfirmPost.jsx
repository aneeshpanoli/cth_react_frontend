import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { createChallenge } from '../backend/AxiosRequest'
import { useHistory } from 'react-router-dom'


const validateForm = (challengeFormData) =>{
    // validate title
    if (!challengeFormData.title){
        return false
    }

}

export default function ConfirmPost(props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const {challengeFormData, userInfo} = useTrackedState();
  const postAxios = () => {
    challengeFormData.owners.push(userInfo.email);
    createChallenge(challengeFormData);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    postAxios();
    history.push('/me')
  };
  

  return (
    <div>
      <Button 
      startIcon={props.startIcon}
      variant={props.variant} color={props.color} onClick={handleClickOpen}>
       {props.children}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Submit the challenge?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please review the challenge for errors before submitting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
