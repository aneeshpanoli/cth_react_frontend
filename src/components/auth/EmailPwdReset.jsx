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
import { resetPwdEmail } from "../backend/AxiosRequest";
import { updateAuthData } from "../redux/actions";

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
  },
  error: {
    color: "red",
  },
}));

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required*";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address*";
  }

  return errors;
};

export default function EmailPwdReset(props) {
  const classes = useStyles();
  const disaptch = useDispatch();
  const { authData } = useTrackedState();
  const [message, setMessage] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      setMessage(true)
      resetPwdEmail(values.email, authData, disaptch, updateAuthData);
    },
  });

  return (
    <Container maxWidth="xs">
      {message? 
      <h5 style={{marginTop:'3rem', textAlign:'center'}}>
        If an account exists for this email address, you will receive an email from us shortly.
      </h5>
      :
      <React.Fragment>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
       <h5 style={{marginTop:'3rem', textAlign:'center'}}>Reset Password</h5>
      <h5 style={{ margin: "0 auto" }}>Please enter your account email.</h5>
        {formik.errors.email ? (
          <sub className={classes.error}>{formik.errors.email}</sub>
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="emailpage"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.email}
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
          Reset password
        </Button>
        </form>

        <Grid container>
          <Grid item xs>
            <Button size="small" color="primary" onClick={props.signIn}>
              {"Sign In"}
            </Button>
          </Grid>
          <Grid item></Grid>
        </Grid>
        </React.Fragment>
      }
       
      
      
    </Container>
  );
}
