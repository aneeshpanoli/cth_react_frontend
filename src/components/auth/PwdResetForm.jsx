import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import { useDispatch, useTrackedState } from "reactive-react-redux";
import { resetPwdForm } from "../backend/AxiosRequest";
import { updateAuthData } from "../redux/actions";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white'
  },
  error: {
    color: "red",
  },
}));

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required*";
  } else if (values.password.length < 8) {
    errors.password = "Must be atleast 8 characters long*";
  }
  if (!values.password1) {
    errors.password1 = "Required*";
  } else if (values.password1.length < 8) {
    errors.password1 = "Must be atleast 8 characters long*";
  }
  if (values.password1 && values.password !== values.password1) {
    errors.password1 = "Passwords don't match*";
  }

  return errors;
};

export default function SignIn(props) {
  const classes = useStyles();
  const disaptch = useDispatch();
  const { authData } = useTrackedState();
  const params = useParams();
  const formik = useFormik({
    initialValues: {
      password1: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      resetPwdForm(
        {
          new_password1: values.password,
          new_password2: values.password1,
          uid: params.uid,
          token: params.token,
        },
        authData,
        disaptch,
        updateAuthData
      );
    },
  });

  return (
    <Container maxWidth="xs">
      {authData&&!authData.resetPwd?
      
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <h5>{" "}</h5>
      <h5 style={{ margin: "0 auto" }}>Enter new password.</h5>
        
        {formik.errors.password ? (
          <sub className={classes.error}>{formik.errors.password}</sub>
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password1 ? (
          <sub className={classes.error}>{formik.errors.password1}</sub>
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password1"
          label="Retype password"
          type="password"
          id="password1"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password1}
        />

        <br />
        {authData.error ? (
          <sub className={classes.error}>
            {authData && authData.error ? authData.error : null}{" "}
          </sub>
        ) : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset Password
        </Button>
      </form>
      :
      <Grid container>
        <Grid item xs xs={12} align="center">
          Sucess!
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained"
          className={classes.submit}
          color="primary" href="/sign-in">
            {"Sign In"}
          </Button>
        </Grid>
      </Grid>
}
    </Container>
  );
}
