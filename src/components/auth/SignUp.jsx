import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { authSignup } from "../backend/AxiosRequest";
import { updateAuthData } from "../redux/actions";
import { useHistory } from "react-router-dom";
import { goBack } from "../js/utils";
import { disposableEmails } from "./disposableEmails";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckIcon from "@material-ui/icons/Check";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
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

const validate = (values) => {
  const errors = {};

  if (!values.password1) {
    errors.password1 = "Password";
  } else if (values.password1.length < 8) {
    errors.password1 = "Must be atleast 8 characters long";
  }
  if (!values.password2) {
    errors.password2 = "Retype password";
  } else if (values.password2 !== values.password1) {
    errors.password2 = "Passwords doesn't match";
  }

  if (!values.email) {
    errors.email = "Email";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ||
    disposableEmails.includes(values.email.split("@")[1])
  ) {
    errors.email = "Invalid email address";
  }
  if (!values.firstName) {
    errors.firstName = "First name";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }
  if (!values.lastName) {
    errors.lastName = "Last name";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }
  if (!values.tAndCond) {
    errors.tAndCond = "Please accept terms and conditions";
  }

  return errors;
};

export default function SignUp(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { authData } = useTrackedState();
  const dispatch = useDispatch();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
      tAndCond: false,
    },
    validate,
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      authSignup(
        values.firstName,
        values.lastName,
        values.email,
        values.password1,
        values.password2,
        authData,
        dispatch,
        updateAuthData
      );
      setOpen(true);
    },
  });

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "5%" }}>
      <div className={classes.root} align="center">
        {authData && authData.signUp && authData.signUp === true ? (
          <Grid container spacing={1} justify="center">
            <Grid
              item
              style={{
                width: "100%",
                height: "3rem",
                textAlign: "center",
                backgroundColor: "#061F71",
                color: "white",
                marginTop: "5rem",
              }}
            >
              <h3>Confirm email</h3>
            </Grid>
            <Grid item>
              <h5 style={{ fontWeight: 400, marginBottom: "3rem" }}>
                We have sent an e-mail to you for verification. Follow the link
                provided to finalize the signup process. Please contact us if
                you do not receive it within a few minutes.
              </h5>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => goBack(history)}
              >
                OK
              </Button>
            </Grid>
          </Grid>
        ) : (
          <React.Fragment>
            <h4 style={{ margin: "0 auto" }}>
              Welcome to <span style={{ fontWeight: 700 }}>Civic</span>Tech
              <span style={{ fontWeight: 700 }}>Hub</span>!<hr></hr>
            </h4>

            <h6 style={{ margin: "0 auto" }}>
              Sign up to access all the features we have to offer! We promise to
              keep your information safe.
              <hr></hr>
            </h6>

            <form
              className={classes.form}
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    variant="standard"
                    required
                    fullWidth
                    id="firstName"
                    label={
                      formik.errors.firstName
                        ? formik.errors.firstName
                        : "First name"
                    }
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CheckIcon style={{ color: "#2F9055" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    id="lastName"
                    label={
                      formik.errors.lastName
                        ? formik.errors.lastName
                        : "Last name"
                    }
                    name="lastName"
                    autoComplete="family-name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CheckIcon style={{ color: "#2F9055" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    id="email"
                    label={formik.errors.email ? formik.errors.email : "Email"}
                    name="email"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AlternateEmailIcon style={{ color: "#2D7DC1" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    name="password1"
                    autoComplete="off"
                    label={
                      formik.errors.password1
                        ? formik.errors.password1
                        : "Password"
                    }
                    type="password"
                    id="password1"
                    onChange={formik.handleChange}
                    value={formik.values.password1}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <VisibilityOutlinedIcon style={{ color: "silver" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    name="password2"
                    autoComplete="off"
                    label={
                      formik.errors.password2
                        ? formik.errors.password2
                        : "Retype the password"
                    }
                    type="password"
                    id="password2"
                    onChange={formik.handleChange}
                    value={formik.values.password2}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <VisibilityOutlinedIcon style={{ color: "silver" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {formik.errors.tAndCond ? (
                    <sup className={classes.error}>
                      {formik.errors.tAndCond}
                    </sup>
                  ) : (
                    <sup className={classes.error}>{"*"}</sup>
                  )}
                  <p style={{ verticalAlign: "center" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          onChange={formik.handleChange}
                          value={formik.values.tAndCond}
                          id="tAndCond"
                          required
                          size="small"
                        />
                      }
                    />
                    I agree to the{" "}
                    <a href="/terms-and-conditions" target="_blank">
                      terms and conditions
                    </a>
                  </p>
                </Grid>
              </Grid>
              {authData && authData.error ? (
                <sub className={classes.error}>{authData.error}</sub>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={props.bttnStyle}
              >
                Create account
              </Button>
              <Grid container justify="flex-start">
                <Grid item>
                  <p>
                    {" "}
                    Have an account?
                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "0.9rem",
                        color: "#2D7DC1",
                      }}
                      size="small"
                      onClick={props.signIn}
                    >
                      Sign in here
                    </Button>
                  </p>
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        )}
      </div>
    </Container>
  );
}
