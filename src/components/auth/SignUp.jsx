import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import { useDispatch, useTrackedState} from 'reactive-react-redux';
import { authSignup } from  '../backend/AxiosRequest';
import { updateAuthData } from '../redux/actions'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const validate = values => {
  const errors = {};

  if (!values.password1) {
    errors.password1 = 'Required*';
  } else if (values.password1.length < 8) {
    errors.password1 = 'Must be atleast 8 characters long*';
  }
  if (!values.password2) {
    errors.password2 = 'Required*';
  } else if (values.password2 !== values.password1) {
    errors.password2 = "Passwords doesn't match";
  }

  if (!values.email) {
    errors.email = 'Required*';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address*';
  }
  if (!values.firstName) {
    errors.firstName = 'Required*';
  } else if (values.firstName.length  > 15) {
    errors.firstName = 'Must be 15 characters or less*';
  }
  if (!values.lastName) {
    errors.lastName = 'Required*';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less*';
  }
  if (!values.tAndCond) {
    errors.tAndCond = 'Please accept terms and conditions*';
  } 

  return errors;
};

export default function SignUp(props) {

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { authData } = useTrackedState();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      tAndCond: false,
    },
    validate,
    onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));
    authSignup(values.firstName, 
      values.lastName, values.email, 
      values.password1, values.password2,
      authData, dispatch, updateAuthData
      );
      setOpen(true);
    },
  });


  return (
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      {!open? 
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            {formik.errors.firstName ? 
            <sup className={classes.error}>{formik.errors.firstName}</sup> : 
            <sup className={classes.error}>{'*'}</sup>}
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            {formik.errors.lastName ? 
            <sup className={classes.error}>{formik.errors.lastName}</sup> : 
            <sup className={classes.error}>{'*'}</sup>}
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
            </Grid>
            <Grid item xs={12}>
            {formik.errors.email ? 
            <sup className={classes.error}>{formik.errors.email}</sup> : 
            <sup className={classes.error}>{'*'}</sup>}
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={12}>
            {formik.errors.password1 ? 
            <sup className={classes.error}>{formik.errors.password1}</sup> : 
            <sup className={classes.error}>{'*'}</sup>}
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password1}
              />
            </Grid>
            <Grid item xs={12}>
            {formik.errors.password2 ? 
            <sup className={classes.error}>{formik.errors.password2}</sup> : 
            <sup className={classes.error}>{'*'}</sup>}
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Retype the password"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password2}
              />
            </Grid>
            <Grid item xs={12}>
            {formik.errors.tAndCond ? 
            <sup className={classes.error}>{formik.errors.tAndCond}</sup> : 
            <sup className={classes.error}>{'*'}</sup>}
              <FormControlLabel
                control={<Checkbox  color="primary" 
                onChange={formik.handleChange}
                value={formik.values.tAndCond}
                id="tAndCond"/>}
                label="I agree to the terms and conditions."
              />
            </Grid>
          </Grid>
          {authData.error? <sub className={classes.error}>{authData.error}</sub> : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Button size="small" color='primary' onClick={props.signIn} >
                {"Sign In"}
                </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      :
        <div >
        <div style={{width:'100%', height:'3rem', textAlign:'center', backgroundColor:'#061F71', color:'white'}} >

          <h3 >Confirm email</h3>
            </div>
        <h5 style={{fontWeight:400}}>
      We have sent an e-mail to you for verification. Follow the link provided to finalize the signup process. Please contact us if you do not receive it within a few minutes.
      </h5>
        </div>
     
}
    </Container>
  );
}