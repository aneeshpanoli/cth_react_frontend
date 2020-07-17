import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { createDoc } from "../backend/AxiosRequest";
import MUIRichTextEditor from "mui-rte";

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
    margin: theme.spacing(3, 1, 2),
    maxWidth: "8rem",
  },
  error: {
    color: "red",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const validate = (values) => {
  const errors = {};

  if (!values.country) {
    errors.country = "Required*";
  } else if (values.country.length < 8) {
    errors.country = "Must be atleast 8 characters long*";
  }
  if (!values.storyText) {
    errors.storyText = "Required*";
  } else if (values.storyText.length < 100) {
    errors.storyText = "storyText should be atleast 100 characters long";
  }

  if (!values.title) {
    errors.title = "Required*";
  } else if (/[*._%+-]+/i.test(values.title)) {
    errors.title = "Invalid characters in the title*";
  } else if (values.title.length < 5) {
    errors.title = "Title should have more then 4 characters*";
  }

  return errors;
};

export default function storyTextForm(props) {
  const [open, setOpen] = React.useState(false);
  const [embed, setEmbed] = React.useState(null);
  const classes = useStyles();
  const { authData } = useTrackedState();
  const dispatch = useDispatch();

  
  const formik = useFormik({
    initialValues: {
      title: "",
      country: "",
      storyText: "",
      embed: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"
    },
    validate,
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      let data = {
        params: {
          index: "storyText",
          q: {
            country: values.country,
            title: values.title,
            storyText: values.storyText,
            createdAt: new Date(),
          },
        },
      };
      createDoc(data, authData.key, null);
      setOpen(true);
    },
  });

  const handleEmbed = (url)=>{
    try {
      console.log(url)
      new URL(url)
      setEmbed(url)
      
    } catch (error) {
      setEmbed(null)
    }
  }



  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {!open ? (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create A Project
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {formik.errors.title ? (
                  <sup className={classes.error}>{formik.errors.title}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="title"
                  label="Project title"
                  name="title"
                  autoComplete="none"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </Grid>
              <Grid item xs={12}>
                {formik.errors.title ? (
                  <sup className={classes.error}>{formik.errors.title}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="title"
                  label="Category"
                  name="title"
                  autoComplete="none"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </Grid>

              <Grid item xs={12}>
                {formik.errors.title ? (
                  <sup className={classes.error}>{formik.errors.title}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="title"
                  label="Short description"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </Grid>

            

              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="embed"
                  label="<embed an image url>"
                  name="embed"
                  onChange={formik.handleChange}
                  value={formik.values.embed}
                />
              </Grid>
             
              {formik.values.embed?
              <Grid item xs={12}>
                <img src={formik.values.embed} alt="title-image" style={{width:'100%'}} />
              </Grid>
              :
              null}
                <Grid item xs={12}>
                {formik.errors.title ? (
                  <sup className={classes.error}>{formik.errors.title}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="title"
                  label="Motivation"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{ borderBottom: "1px solid grey", minHeight: "4rem" }}
                >
                  <MUIRichTextEditor
                    label="Description *"
                    controls={[
                      "bold",
                      "italic",
                      "underline",
                      "bulletList",
                      "quote",
                      "code",
                      "link"
                    ]}
                    toolbarButtonSize="small"
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                {formik.errors.country ? (
                  <sup className={classes.error}>{formik.errors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="country"
                  label="Country"
                  type="text"
                  id="country"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Grid>
              <Grid item xs={12}>
                {formik.errors.country ? (
                  <sup className={classes.error}>{formik.errors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="country"
                  label="Important links"
                  type="text"
                  id="country"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Grid>
              <Grid item xs={12}>
                {formik.errors.country ? (
                  <sup className={classes.error}>{formik.errors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="country"
                  label="Tags"
                  type="text"
                  id="country"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Grid>
              <Grid item xs={12}>
                {formik.errors.country ? (
                  <sup className={classes.error}>{formik.errors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="country"
                  label="Video url"
                  type="text"
                  id="country"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Grid>
              <Grid item xs={12}>
                {formik.errors.country ? (
                  <sup className={classes.error}>{formik.errors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="country"
                  label="Events/Hackathons"
                  type="text"
                  id="country"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Cancel
            </Button>
            {authData.error ? (
              <sub className={classes.error}>{authData.error}</sub>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={Object.keys(formik.errors)[0] ? true : false}
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <Grid container justify="flex-end">
              <Grid item></Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <div>
          <div
            style={{
              width: "100%",
              height: "3rem",
              textAlign: "center",
              backgroundColor: "#061F71",
              color: "white",
            }}
          >
            <h3>Thank you!</h3>
          </div>
          <h5 style={{ fontWeight: 400 }}>
            We appreciate your feecback. If you have given the email address, we
            will get back to you with the updates.
          </h5>
        </div>
      )}
    </Container>
  );
}
