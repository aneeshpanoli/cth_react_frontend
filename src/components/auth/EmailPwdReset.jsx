import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

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
    errors.email = "Email";
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
    <Container component="main" maxWidth="xs" style={{ marginTop: "5%" }}>
      {message? 
      <h5 style={{marginTop:'3rem', textAlign:'center'}}>
        If an account exists for this email address, you will receive an email from us shortly.
      </h5>
      :
      <React.Fragment>
        <h4 style={{ margin: "0 auto", textAlign:'center'}}>Forgot your password?</h4>
            <hr></hr>
            <h6 style={{ margin: "0 auto" }}>
             Don't worry! Just fill in the email you used to sign up and we'll send you a link to reset your password.
            </h6>
<hr></hr>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
       
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="emailpage"
          label={formik.errors.email ?formik.errors.email :"Email"}
          name="email"
          autoComplete="email"
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.email}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmailIcon style={{color:'#2D7DC1'}}/>
              </InputAdornment>
            )}}
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
          color="secondary"
          className={props.bttnStyle}
        >
          Reset password
        </Button>
        </form>

        <Grid container style={{marginTop:'1rem'}}>
          <Grid item xs >
          <p> No account? No problem.
        <Button style={{textTransform:'none', fontSize:"0.9rem", color:'#2D7DC1'}} size="small" onClick={props.signUp}>
              Sign up here
            </Button></p>
          </Grid>
          <Grid item></Grid>
        </Grid>
        </React.Fragment>
      }
       
      
      
    </Container>
  );
}
