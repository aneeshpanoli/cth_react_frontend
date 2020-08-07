import React from "react";
import { useHistory } from "react-router-dom";
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
import ImageUpload from "../create/ImageUpload";
import { convertToHTML } from "draft-convert";
import ChipInput from "material-ui-chip-input";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  chipRoot: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    variant: "outlined",
    height: "1.5rem",
    color: theme.palette.primary.main,
    border: "1px solid",
  },
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

  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length < 4) {
    errors.title = "The title should be atleast 4 characters long";
  } else if (values.title.length > 60) {
    errors.title = "The title should be less than 60 characters";
  } else if (/[*._%+-?]+/i.test(values.title)) {
    errors.title = "Invalid characters in the title*";
  }

  if (!values.subtitle) {
    errors.subtitle = "Required";
  } else if (values.subtitle.length < 60) {
    errors.subtitle = "The description should be atleast 60 characters long";
  }

  if (!values.motivation) {
    errors.motivation = "Required";
  } else if (values.motivation.length < 60) {
    errors.motivation = "The description should be atleast 60 characters long";
  }

  if (!values.storyText) {
    errors.storyText = "Required";
  } else if (values.storyText.length < 60) {
    errors.storyText = "The description should be atleast 60 characters long";
  }

  if (!values.category) {
    errors.category = "Required";
  }

  if (values.roles.length === 0 || !values.roles) {
    errors.roles = "Required";
  }

  if (values.links && values.links.length > 0) {
    try {
      new URL(values.links.slice(-1));
    } catch (error) {
      errors.links = "Not a valid url";
    }
  }

  if (values.video) {
    try {
      new URL(values.video);
    } catch (error) {
      errors.video = "Not a valid url";
    }
  }

  if (values.keywords.length === 0 || !values.keywords) {
    errors.keywords = "Required";
  }

  if (values.builtWith.length === 0 || !values.builtWith) {
    errors.builtWith = "Required";
  }

  if (!values.country) {
    errors.country = "Required";
  }

  if (!values.image) {
    errors.image = "Required";
  }

  return errors;
};

export default function MTSubmitForm(props) {
  const [formErrors, setFormErrors] = React.useState({});
  const history = useHistory();
  const classes = useStyles();
  const { authData } = useTrackedState();
  React.useEffect(() => {
    if (!authData.user) {
      history.push("/");
    }
  });

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [embed, setEmbed] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const [newChips, setNewChips] = React.useState(null);
  const [formValues, setFormValues] = React.useState({
    builtWith: [],
    category: "",
    country: "",
    createdAt: new Date(),
    storyText: "",
    subtitle: "",
    owners: authData && authData.user ? authData.user.id : "",
    video: "",
    hackathons: [],
    updatedAt: new Date(),
    links: [],
    keywords: [],
    title: "",
    roles: [],
    motivation: "",
    rewards: "",
    crisis: "",
    language: "",
    approved: "no",
    claimed: "yes",
  });

  const handleDeleteChip = (chip, objProp) => {
    let newArr = [...formValues[objProp]].filter((item) => item !== chip);
    setFormValues(Object.assign({}, formValues, { [objProp]: newArr }));
  };

  const handleDeleteChipRoles = (chip) => {
    let newArr = [...formValues.roles].filter((item) => item !== chip);
    setFormValues(Object.assign({}, formValues, { roles: newArr }));
  };
  const handleChange = (field, values) => {
    // copy new values to formValues
    setFormValues({ ...formValues, [field]: values });
  };

  React.useEffect(() => {
    // console.log(formValues);
    setFormErrors(validate({ ...formValues, image: embed ? true : false }));
    setNewChips(makeChips(formValues));
  }, [formValues, embed]);

  const handleSubmit = () => {
    console.log(formErrors);
    if (!Object.keys(formErrors).length === 0) {
      console.log("not submitting");
      return;
    }
    //   alert(JSON.stringify(values, null, 2));
    console.log("submitting data");
    let data = {
      status: "microtask",
      index: "microtasks",
      q: formValues,
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));
    formData.append("image", image, image.path);

    postProject(formData, authData.key, history, formValues.title);
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

  const makeChips = (values) => {
    return (
      <div className={classes.chipRoot}>
        {values.roles.map((role, i) => {
          return (
            <li key={i}>
              <Chip
                label={role}
                onDelete={() => handleDeleteChipRoles(role)}
                onClick={() => handleDeleteChipRoles(role)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </div>
    );
  };

  return (
    <React.Fragment>
      {!open ? (
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create A Microtask
          </Typography>

          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              return false;
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
                  multiline
                  id="title"
                  label="Microtask title"
                  name="title"
                  autoComplete="none"
                  onChange={() => handleChange("title", event.target.value)}
                  value={formValues.title}
                />
              </Grid>

              {/* IMAGE EMBED */}
              <Grid item xs={12}>
                {formErrors.image ? (
                  <sup className={classes.error}>{formErrors.image}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <ImageUpload onSave={handleEmbed} />
                {embed ? (
                  <Grid item xs={12}>
                    <img
                      src={embed}
                      alt="title-image"
                      style={{
                        maxHeight: "400px",
                        marginTop: "1rem",
                        maxWidth: "100%",
                      }}
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
                  onChange={() => handleChange("subtitle", event.target.value)}
                  value={formValues.subtitle}
                />
              </Grid>

              {/* MOTIVATION               */}
              <Grid item xs={12}>
                {formErrors.motivation ? (
                  <sup className={classes.error}>{formErrors.motivation}</sup>
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
                    handleChange("motivation", event.target.value)
                  }
                  value={formValues.motivation}
                />
              </Grid>

              {/* DESCRIPTION */}

              <Grid item xs={12}>
                {formErrors.storyText ? (
                  <sup className={classes.error}>{formErrors.storyText}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
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
                      handleChange(
                        "storyText",
                        convertToHTML({
                          styleToHTML: (style) => {
                            if (style === "BOLD") {
                              return <span style={{ color: "blue" }} />;
                            }
                          },
                          blockToHTML: (block) => {
                            if (block.type === "code-block") {
                              return <code />;
                            }
                          },
                          entityToHTML: (entity, originalText) => {
                            try {
                              new URL(entity.data.url);
                            } catch (error) {
                              return (
                                originalText + " (" + entity.data.url + ")"
                              );
                            }
                            if (entity.type === "LINK") {
                              return (
                                <a href={entity.data.url} target={"_blank"}>
                                  {originalText}
                                </a>
                              );
                            }
                            return originalText;
                          },
                        })(state.getCurrentContent())
                      )
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
                    handleChange("category", value ? value.category : "");
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
                {formErrors.roles ? (
                  <sup className={classes.error}>{formErrors.roles}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                {newChips}
                <Autocomplete
                  id="role"
                  options={roles}
                  getOptionLabel={(option) => option.role}
                  fullWidth
                  onChange={(_, value) => {
                    handleChange(
                      "roles",
                      value && !formValues.roles.includes(value.role)
                        ? [...formValues.roles].concat([value.role])
                        : [...formValues.roles]
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Roles needed*"
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
                  id="country"
                  options={countries}
                  getOptionLabel={(option) => option.label}
                  fullWidth
                  onChange={(_, value) => {
                    handleChange("country", value ? value.label : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country*"
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              {/* LINKS */}
              <Grid item xs={12}>
                {formErrors.links ? (
                  <sup className={classes.error}>{formErrors.links}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <ChipInput
                  value={formValues.links}
                  classes={{
                    chip: classes.chip,
                  }}
                  fullWidth
                  label="Important links (press enter to add more than one link)"
                  onAdd={(chip) => {
                    handleChange("links", [...formValues.links].concat([chip]));
                  }}
                  onDelete={(chip, index) => handleDeleteChip(chip, "links")}
                />
              </Grid>

              {/* BUITWITH */}
              <Grid item xs={12}>
                {formErrors.builtWith ? (
                  <sup className={classes.error}>{formErrors.builtWith}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <ChipInput
                  classes={{
                    chip: classes.chip,
                  }}
                  value={formValues.builtWith}
                  fullWidth
                  label="Technology (press enter to add more than one technologies)"
                  onAdd={(chip) => {
                    handleChange(
                      "builtWith",
                      [...formValues.builtWith].concat([chip])
                    );
                  }}
                  onDelete={(chip, index) =>
                    handleDeleteChip(chip, "builtWith")
                  }
                />
              </Grid>

              {/* TAGS/KEYWORDS */}
              <Grid item xs={12}>
                {formErrors.keywords ? (
                  <sup className={classes.error}>{formErrors.keywords}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <ChipInput
                  classes={{
                    chip: classes.chip,
                  }}
                  value={formValues.keywords}
                  fullWidth
                  label="Tags (press enter to add more than one keyword)"
                  onAdd={(chip) => {
                    handleChange(
                      "keywords",
                      [...formValues.keywords].concat([chip])
                    );
                  }}
                  onDelete={(chip, index) => handleDeleteChip(chip, "keywords")}
                />
              </Grid>
              {/* VIDEO URL */}
              <Grid item xs={12}>
                {formErrors.video ? (
                  <sup className={classes.error}>{formErrors.video}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <TextField
                  variant="standard"
                  fullWidth
                  name="videourl"
                  label="Video url"
                  type="text"
                  id="videoUrl"
                  autoComplete="current-password"
                  onChange={() => handleChange("video", event.target.value)}
                  value={formValues.videoUrl}
                />
              </Grid>
              {/* EVENTS/HACKATHONS */}
              <Grid item xs={12}>
                {formErrors.hackathons ? (
                  <sup className={classes.error}>{formErrors.hackathons}</sup>
                ) : (
                  <sup className={classes.error}>{""}</sup>
                )}
                <ChipInput
                  value={formValues.hackathons}
                  fullWidth
                  classes={{
                    chip: classes.chip,
                  }}
                  label="Events/hackathons (press enter to add more than one events/hackathons)"
                  onAdd={(chip) => {
                    handleChange(
                      "hackathons",
                      [...formValues.hackathons].concat([chip])
                    );
                  }}
                  onDelete={(chip, index) =>
                    handleDeleteChip(chip, "hackathons")
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={props.openForm}
            >
              Cancel
            </Button>
            {authData.error ? (
              <sub className={classes.error}>{authData.error}</sub>
            ) : null}
            <Button
              onClick={handleSubmit}
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
          <h5 style={{ fontWeight: 400 }}>Your Microtask has been submitted.</h5>
        </div>
      )}
    </React.Fragment>
  );
}
