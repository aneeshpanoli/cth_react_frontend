import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { authSignIn } from  '../backend/AxiosRequest';
import { updateAuthData } from '../redux/actions'
import { useHistory } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
  },
}));

const validate = values => {
    const errors = {};
  
    if (!values.password) {
      errors.password = 'Required*';
    } else if (values.password.length < 8) {
      errors.password = 'Must be atleast 8 characters long*';
    }
  
    if (!values.email) {
      errors.email = 'Required*';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address*';
    }
  
    return errors;
  };

export default function SignIn(props) {
  const classes = useStyles();
  const disaptch = useDispatch();
  const { authData } = useTrackedState();
  const history = useHistory();

const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));
    authSignIn(values.email, values.password , authData, disaptch, updateAuthData);
    },
  });


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Please sign in with your email and password to continue.
        </Typography>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
        {formik.errors.email ? <sub className={classes.error}>{formik.errors.email}</sub> : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          
          {formik.errors.password ? <sub className={classes.error}>{formik.errors.password}</sub> : null}
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
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <br/>
           {authData.error? <sub className={classes.error}>{'Wrong Email or Password!'}</sub> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Reset password
              </Link>
            </Grid>
            <Grid item>
            <Button size="small" color='primary' onClick={props.signUp} >
                {"Sign Up"}
                </Button>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}