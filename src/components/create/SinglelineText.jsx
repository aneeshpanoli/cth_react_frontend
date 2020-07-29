import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { updateProjectFormData } from "../redux/actions";
import { useDispatch, useTrackedState } from "reactive-react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

export default function FormPropsTextFields(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [primaryArea, setPrimaryArea] = useState("");
  const [title, setTitle] = useState("");
  const { projectFormData } = useTrackedState();

  function handleChange(value, id) {
    if (id === "primeArea") {
      projectFormData["primeArea"] = value;
    } else if (id === "title") {
      projectFormData["title"] = value;
    }
    console.log(projectFormData);
    dispatch(updateProjectFormData(projectFormData));
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id={props.id}
        required
        id="standard-required"
        label="Required"
        placeholder="Title"
        autoFocus={true}
        fullWidth={true}
        multiline={true}
        rowsMax={Infinity}
        inputProps={{
          maxLength: 60,
        }}
        onChange={(e) => handleChange(e.target.value, props.id)}
        defaultValue={
          props.id === "title"
            ? projectFormData.title
            : projectFormData.primeArea
        }
      />
    </form>
  );
}
