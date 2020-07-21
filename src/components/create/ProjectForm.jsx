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
import { postProject } from "../backend/AxiosRequest";
import MUIRichTextEditor from "mui-rte";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { countries, sectors, roles} from '../search/utils'
import { convertToRaw } from 'draft-js'
import ImageUpload from './ImageUpload'


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
  const [image, setImage] = React.useState(null);
  const classes = useStyles();
  const { authData } = useTrackedState();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      storyText: "",
      motivation: "",
      subtitle: "",
    },
    // validate,
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      let data = {
          index: "storyText",
          q: {
            country: values.country, //undefined right now
            title: values.title,
            storyText: values.storyText,
            createdAt: new Date()          
          },
      };
      let formData = new FormData();
      // formData.append('country', values.country)
      // formData.append('title', values.title)
      // formData.append('storyText', values.storyText)
      // formData.append('createdAt', new Date())
      formData.append('params', JSON.stringify(data))
      formData.append('image', image, image.path)
      
      postProject(formData, authData.key);
      setOpen(true);
    },
  });

  const handleEmbed = (url) => {
    setImage(url[0].file);
    console.log(url[0].file.path)
    let reader = new FileReader();
    
    reader.onloadend = () => {
      setEmbed(reader.result)
      console.log(embed)
    }
    reader.readAsDataURL(url[0].file)
  };

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
              <ImageUpload onSave={handleEmbed}/>
              {embed ? (
                <Grid item xs={12}>
                  <img
                    src={embed}
                    alt="title-image"
                    style={{ maxHeight: "400px", marginTop:'1rem' }}
                  />
                </Grid>
              ) : null}
              </Grid>
              
              <Grid item xs={12}>
                {formik.errors.title ? (
                  <sup className={classes.error}>{formik.errors.title}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <Autocomplete
                  id="combo-box-demo"
                  options={sectors}
                  getOptionLabel={(option) => option.sector}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sector"
                      variant="standard"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                {formik.errors.title ? (
                  <sup className={classes.error}>{formik.errors.title}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <Autocomplete
                  id="combo-box-roles"
                  options={roles}
                  getOptionLabel={(option) => option.role}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Roles needed"
                      variant="standard"
                    />
                  )}
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
                  id="subtitle"
                  label="Short description"
                  name="subtitle"
                  onChange={formik.handleChange}
                  value={formik.values.subtitle}
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
                  id="motivation"
                  label="Motivation"
                  name="motivation"
                  onChange={formik.handleChange}
                  value={formik.values.motivation}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{ borderBottom: "1px solid grey", minHeight: "4rem" }}
                >
                  <MUIRichTextEditor
                    label="Description *"
                    id='storyText'
                    name="storyText"
                    controls={[
                      "bold",
                      "italic",
                      "underline",
                      "bulletList",
                      "quote",
                      "code",
                      "link",
                    ]}
                    toolbarButtonSize="small"
                    onChange={(event)=>formik.handleChange(JSON.stringify(convertToRaw(event.getCurrentContent())))}
                    value={formik.values.storyText}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                {formik.errors.country ? (
                  <sup className={classes.error}>{formik.errors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <Autocomplete
               
                 onChange={(_, value)=> formik.handleChange(value.label)}
                 
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="country"
                      label="Country"
                      variant="standard"
                    />
                  )}
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
                  name="importantLink"
                  label="Important links"
                  type="text"
                  id="impLinks"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.impLinks}
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
                  name="tags"
                  label="Tags"
                  type="text"
                  id="tags"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.tags}
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
                  name="videour;"
                  label="Video url"
                  type="text"
                  id="videoUrl"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.videoUrl}
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
                  name="eventHackathons"
                  label="Events/Hackathons"
                  type="text"
                  id="hackathons"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.hackathons}
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

