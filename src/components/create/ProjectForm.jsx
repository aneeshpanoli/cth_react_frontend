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
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { postProject } from "../backend/AxiosRequest";
import MUIRichTextEditor from "mui-rte";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { countries, categories, roles } from "../search/utils";
import { convertToRaw, EditorState } from "draft-js";
import ImageUpload from "./ImageUpload";
import { convertToHTML, convertFromHTML } from "draft-convert";
import ChipInput from "material-ui-chip-input";

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

export default function ProjectForm(props) {
  const [formErrors, setFormErrors] = React.useState({});
  const classes = useStyles();
  const { authData } = useTrackedState();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [embed, setEmbed] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [formValues, setFormValues] = React.useState({
    builtWith: [],
    category: "",
    country: "",
    createdAt: new Date(),
    storyText: "",
    subtitle: "",
    owners: "",
    video: "",
    hackathons: [],
    updatedAt: "",
    links: [],
    keywords: [],
    title: "",
    roles: [],
    motivation: "",
    rewards: "",
    crisis: "",
    language: "",
  });

  const handleDeleteChip = (chip, index, objProp) => {
    let newArr = [...formValues[objProp]].filter(item => item !== chip)
    setFormValues(Object.assign({}, formValues, {[objProp]:newArr}));
  };
  const handleChange = (values) => {
    // copy new values to formValues
    console.log(values)
    setFormValues(Object.assign({}, formValues, values));
    setFormErrors(validate(values));
  };
  const handleSubmit = (values) => {
    if(formErrors){
      return
    }
    //   alert(JSON.stringify(values, null, 2));
    let data = {
      index: "projectsNew",
      q: {
        country: values.country, //undefined right now
        title: values.title,
        storyText: values.storyText,
        createdAt: values.createdAt,
      },
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));
    formData.append("image", image, image.path);

    postProject(formData, authData.key);
    setOpen(true);
  };

  const handleEmbed = (url) => {
    setImage(url[0].file);
    console.log(url[0].file.path);
    let reader = new FileReader();

    reader.onloadend = () => {
      setEmbed(reader.result);
      console.log(embed);
    };
    reader.readAsDataURL(url[0].file);
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
            onSubmit={(e)=>{
              e.preventDefault();
              handleSubmit(formValues)
            }}
          >
            {/* TITLE */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {formErrors.title ? (
                  <sup className={classes.error}>{formErrors.title}</sup>
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
                  onChange={() => handleChange({ title: event.target.value })}
                  value={formValues.title}
                />
              </Grid>

              {/* IMAGE EMBED */}
              <Grid item xs={12}>
                <ImageUpload onSave={handleEmbed} />
                {embed ? (
                  <Grid item xs={12}>
                    <img
                      src={embed}
                      alt="title-image"
                      style={{ maxHeight: "400px", marginTop: "1rem" }}
                    />
                  </Grid>
                ) : null}
              </Grid>

              {/* SUBTITLE */}

              <Grid item xs={12}>
                {formErrors.subtitle ? (
                  <sup className={classes.error}>{formErrors.subtitle}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="subtitle"
                  label="Subtitle"
                  name="subtitle"
                  onChange={() =>
                    handleChange({ subtitle: event.target.value })
                  }
                  value={formValues.subtitle}
                />
              </Grid>

              {/* MOTIVATION               */}
              <Grid item xs={12}>
                {formErrors.motivation ? (
                  <sup className={classes.error}>{formErrors.title}</sup>
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
                  onChange={() =>
                    handleChange({ motivation: event.target.value })
                  }
                  value={formValues.motivation}
                />
              </Grid>

              {/* DESCRIPTION */}

              <Grid item xs={12}>
                <div
                  style={{ borderBottom: "1px solid grey", minHeight: "4rem" }}
                >
                  <MUIRichTextEditor
                    label="Description *"
                    id="storyText"
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
                    onChange={(state) =>
                      handleChange({
                        storyText: convertToHTML(state.getCurrentContent()),
                      })
                    }
                    // value={EditorState.createWithContent(convertFromHTML(formValues.storyText)) }
                  />
                </div>
              </Grid>

              {/* CATEGORY              */}
              <Grid item xs={12}>
                {formErrors.category ? (
                  <sup className={classes.error}>{formErrors.category}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <Autocomplete
                  id="combo-box-demo"
                  options={categories}
                  getOptionLabel={(option) => option.category}
                  fullWidth
                  onChange={(_, value) => {
                    handleChange({ category: value.category });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="standard"
                    />
                  )}
                />
              </Grid>

              {/* ROLES */}
              <Grid item xs={12}>
                {formErrors.role ? (
                  <sup className={classes.error}>{formErrors.role}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <Autocomplete
                  id="role"
                  options={roles}
                  getOptionLabel={(option) => option.role}
                  fullWidth
                  onChange={(_, value) => {
                    handleChange({ role: value.role });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Roles needed"
                      variant="standard"
                    />
                  )}
                />
              </Grid>

              {/* COUNTRY */}

              <Grid item xs={12}>
                {formErrors.country ? (
                  <sup className={classes.error}>{formErrors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <Autocomplete
                  id="role"
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  fullWidth
                  onChange={(_, value) => {
                    handleChange({ role: value.label });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Country" variant="standard" />
                  )}
                />
              </Grid>
              {/* LINKS */}
              <Grid item xs={12}>
                {formErrors.country ? (
                  <sup className={classes.error}>{formErrors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <ChipInput
                  value={formValues.links}
                  fullWidth
                  label='Important links (press enter to add more than one link)'
                  onAdd={(chip) => {
                    handleChange({ links: [...formValues.links].concat([chip]) });
                  }}
                  onDelete={(chip, index) => handleDeleteChip(chip, index, 'links')}
                />

              </Grid>

              {/* TAGS/KEYWORDS */}
              <Grid item xs={12}>
                {formErrors.country ? (
                  <sup className={classes.error}>{formErrors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <ChipInput
                  value={formValues.keywords}
                  fullWidth
                  label='Tags (press enter to add more than one keyword)'
                  onAdd={(chip) => {
                    handleChange({ keywords: [...formValues.keywords].concat([chip]) });
                  }}
                  onDelete={(chip, index) => handleDeleteChip(chip, index, 'keywords')}
                />
              </Grid>
              {/* VIDEO URL */}
              <Grid item xs={12}>
                {formErrors.country ? (
                  <sup className={classes.error}>{formErrors.country}</sup>
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
                  onChange={() => handleChange({ field: "", value: "" })}
                  value={formValues.videoUrl}
                />
              </Grid>
              {/* EVENTS/HACKATHONS */}
              <Grid item xs={12}>
                {formErrors.country ? (
                  <sup className={classes.error}>{formErrors.country}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <ChipInput
                  value={formValues.hackathons}
                  fullWidth
                  label='Events/hackathons (press enter to add more than one events/hackathons)'
                  onAdd={(chip) => {
                    handleChange({ hackathons: [...formValues.hackathons].concat([chip]) });
                  }}
                  onDelete={(chip, index) => handleDeleteChip(chip, index, 'hackathons')}
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
              disabled={Object.keys(formErrors)[0] ? true : false}
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
