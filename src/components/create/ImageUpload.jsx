import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialogBase } from "material-ui-dropzone";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function FeedbackForm(props) {
  const [fileObjects, setFileObjects] = React.useState([]);
  const [fileOpen, setFileOpen] = React.useState(false);

  return (
    <Grid item xs={12}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFileOpen(true)}
      >
        Add Image
      </Button>

      <DropzoneDialogBase
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        fileObjects={fileObjects}
        cancelButtonText={"cancel"}
        submitButtonText={"OK"}
        maxFileSize={5000000}
        open={fileOpen}
        onAdd={(newFileObjs) => {
          console.log("onAdd", newFileObjs);
          setFileObjects(newFileObjs);
        }}
        onDelete={(deleteFileObj) => {
          console.log("onDelete", deleteFileObj);
          setFileObjects([]);
        }}
        onClose={() => setFileOpen(false)}
        onSave={() => {
          props.onSave(fileObjects);
          setFileOpen(false);
        }}
        // onSave={() => {
        //   console.log("onSave", fileObjects);
        //   setFileOpen(false);
        // }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </Grid>
  );
}
