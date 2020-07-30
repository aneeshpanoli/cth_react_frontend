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
    <div>
      <Button
        color="secondary"
        onClick={handleClickOpen}
        variant="outlined"
        style={{
          borderRadius: 10,
          fontSize: "1rem",
          verticalAlign: "center",
          height: "1.9rem",
          width:'6.5rem'
        }}
      >
       <span style={{whiteSpace:'noWrap'}}>Sign in</span> 
      </Button>
    </div>
  );
}
