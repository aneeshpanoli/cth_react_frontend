import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import { useDispatch, useTrackedState} from 'reactive-react-redux';
import { createDoc, queryElasticsearch } from '../backend/AxiosRequest'




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

  if (!values.country) {
    errors.country = 'Required*';
  } else if (values.country.length < 8) {
    errors.country = 'Must be atleast 8 characters long*';
  }
  if (!values.feedback) {
    errors.feedback = 'Required*';
  } else if (values.feedback.length < 100) {
    errors.feedback = "Feedback should be atleast 100 characters long";
  }

  if (!values.email) {
    errors.email = 'Required*';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address*';
  }

  return errors;
};

export default function FeedbackForm(props) {

  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { authData } = useTrackedState();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      country: '',
      feedback: '',
    },
    validate,
    onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));
    let data = {
      params: {
        index: "feedback",
        q: {
          country: values.country,
          email: values.email,
          feedback: values.feedback,
          createdAt: new Date()
        },
      },
    };
    createDoc(data, authData.key, null)
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
         Feedback Form
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>

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
            {formik.errors.country ? 
            <sup className={classes.error}>{formik.errors.country}</sup> : 
            <sup className={classes.error}>{'*'}</sup>}
              <TextField
                variant="outlined"
                required
                fullWidth
                name="country"
                label="Country"
                type="text"
                id="country"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item xs={12}>
            {formik.errors.feedback ? 
            <sup className={classes.error}>{formik.errors.feedback}</sup> : 
            <sup className={classes.error}>{'*'}</sup>}
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={12}
                name="feedback"
                label="Feedback"
                type="text"
                id="feedback"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.feedback}
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
            Send feedback
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            
            </Grid>
          </Grid>
        </form>
      </div>
      :
        <div >
        <div style={{width:'100%', height:'3rem', textAlign:'center', backgroundColor:'#061F71', color:'white'}} >

          <h3 >Thank you!</h3>
            </div>
        <h5 style={{fontWeight:400}}>
      We appreciate your feecback. If you have given the email address, we will get back to you with the updates.
      </h5>
        </div>
     
}
    </Container>
  );
}