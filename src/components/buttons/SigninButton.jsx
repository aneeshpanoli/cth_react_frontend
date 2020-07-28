import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';






export default function AlertDialogSlide() {

  const history = useHistory();

  const handleClickOpen = () => {
    history.push('/sign-in')
    // setOpen(true);
  };




  return (
    <div>
      <Button color="secondary"  onClick={handleClickOpen}>
        <LockOutlinedIcon />
      </Button>
    </div>
  );
}
