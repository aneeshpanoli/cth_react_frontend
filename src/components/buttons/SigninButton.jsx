import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export default function AlertDialogSlide() {
  const history = useHistory();

  const handleClickOpen = () => {
    history.push("/sign-in");
    // setOpen(true);
  };

  return (
      <Button
        color="secondary"
        onClick={handleClickOpen}
        variant="outlined"
        style={{
          borderRadius: 5,
          fontSize: "1.2rem",
          verticalAlign: "center",
          height: "2.7rem",
          width:'7rem',
          marginLeft:'0.5rem',
        }}
      >
       <span style={{whiteSpace:'noWrap'}}>Sign in</span> 
      </Button>
  );
}
