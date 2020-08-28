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
import { authSignIn } from "../backend/AxiosRequest";
import { updateAuthData } from "../redux/actions";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
  },
  label: {
    fontSize:"0.9rem",
    whiteSpace:'nowrap'
  },
  checked: {
    
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
    textTransform: "none",
    textAlign: "left",
  },
  error: {
    color: "red",
  },
}));

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Password";
  } else if (values.password.length < 8) {
    errors.password = "Must be atleast 8 characters long";
  }

  if (!values.email) {
    errors.email = "Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export default function SignIn(props) {
  const classes = useStyles();
  const disaptch = useDispatch();
  const { authData } = useTrackedState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      authSignIn(
        values.email,
        values.password,
        authData,
        disaptch,
        updateAuthData
      );
    },
  });

  return (
    <div className={classes.root} align="center">
      <h4 style={{ margin: "0 auto"}}>Welcome back!
      <hr></hr>
      </h4>
      <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="emailpage"
          label={formik.errors.email ? formik.errors.email:"Email"}
          name="email"
          autoComplete="email"
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.email}
          InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CheckIcon style={{color:'#2F9055'}}/>
            </InputAdornment>
          )}}
        />

        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="password"
          label={formik.errors.password ? formik.errors.password:"Password"}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityOutlinedIcon style={{color:'silver'}}/>
              </InputAdornment>
            )}}
        />
        <Grid container>
          <Grid item xs align="left">
            <FormControlLabel
              control={<Checkbox size="small" value="remember" color="primary" 
              classes={{
                checked: classes.checked,
              }}
              />}
              label="Remember me"
              classes={{
                label: classes.label,
              }}
            />
          </Grid>
          <Grid item xs align="right">
            <Button
              size="small"
              color="primary"
              onClick={props.reset}
              style={{ textTransform: "none", fontSize:"0.9rem", color:'#2D7DC1', whiteSpace:'nowrap' }}
            >
              {"Forgot password?"}
            </Button>
          </Grid>
        </Grid>
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
          startIcon={<EmailIcon style={{color:'blue'}}/>}
        >
          Sign in with email
        </Button>
      </form>
      <h5 style={{
         width: '100%', 
         textAlign: 'center',
         borderBottom: '1px dashed silver',
         lineHeight: '0.1em',
         marginTop: '1.5rem',
         marginBottom:'1.5rem'
      }}><span style={{
        background:'#fff',
    padding:'0 10px'
      }}>OR</span></h5>
    </div>
  );
}
