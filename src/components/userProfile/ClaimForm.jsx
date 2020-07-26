import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import RedeemIcon from "@material-ui/icons/Redeem";
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams, Link } from "react-router-dom";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import { getAnotherUserInfoElastic } from "../backend/AxiosRequest";
import { updateOtherUserData } from "../redux/actions";
import { queryEsById, updateProject } from '../backend/AxiosRequest'
import { updateSelectedProject} from '../redux/actions'
import { MATCH_ID_TITLE } from '../backend/EsQueries'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    fontWeight: 700,
  },
  paper: {
    marginRight: theme.spacing(3),
  },
}));

export default function AvatarIcon() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { selectedProject, otherUserData, authData } = useTrackedState();
  const [errors, setErrors] = React.useState({
    proof: "",
    email: ""
  });
  const classes = useStyles();
  const [values, setValues] = React.useState({
    proof: "",
    email: ""
  });

  const handleChange = (event, field) => {
    setValues({...values, [field]:event.target.value});
  };

  const validate = () =>{
    let newErrors = {}
    if (!values.email) {
      newErrors.email = 'Required*';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      newErrors.email = 'Invalid email address*';
    }
    if (!values.proof) {
      newErrors.proof = 'Required*';
    } else if (values.proof.length < 60) {
      newErrors.proof = 'Proof of ownership should be atleast 60 characters long';
    }
    setErrors(newErrors);
    return newErrors
  }
  React.useEffect(() => {
    if (selectedProject && selectedProject._source.owners) {
      getAnotherUserInfoElastic(
        authData,
        selectedProject._source.owners,
        dispatch,
        updateOtherUserData
      );
    } else {
      dispatch(updateOtherUserData(null));
    }
  }, []);


  const handleSubmit = () => {
    console.log(values)
    if (authData && authData.user) {
      let currErrors = validate()
      if (!Object.keys(currErrors).length === 0){
        console.log('errors')
        return
      }
      claimProject(authData.user.id);
    } else {
      history.push("/sign-in");
    }
  };

  const handleCancel = () =>{
    history.goBack();
  }


  const claimProject = (id) =>{
    let data = {
      status: "projectclaim",
      index: selectedProject._index,
      id: selectedProject._id,
      title: selectedProject._source.title,
      q: {claimed: id, claimedAt: new Date(), proof:[values.proof, values.email]}
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));
   
    let query = MATCH_ID_TITLE(selectedProject._id, selectedProject._source.title.replace(/-/g, " "));
    const updateData = () => queryEsById(query, dispatch, updateSelectedProject, history);
    updateProject(formData, authData.key, history, selectedProject._source.title, updateData);
  }

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={12} sm={12} md={12} >
        <h1>Claim project</h1>
        </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <h6>Please tell us how we can verify your ownership (Include links, and other relevent infomation). Also, include a valid email address for our staff to contact you.</h6>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
        <form noValidate autoComplete="off">
          <sup>{errors.proof}</sup>
        <TextField
          id="claim"
          label="Proof of ownership"
          required
          multiline
          fullWidth
          rows={4}
          defaultValue=""
          onChange={() =>handleChange(event, 'proof')}
        />
         <sup>{errors.email}</sup>
        <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={() =>handleChange(event, 'email')}
          />
        </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} >
        <Button
              startIcon={<CheckCircleIcon />}
              disableElevation
              size="small"
              color="primary"
              variant="outlined"
              style={{ textTransform: "none", borderRadius: 25 }}
              onClick={handleCancel}
            >
              {" "}
              Cancel claim
            </Button>
            <Button
              startIcon={<ThumbDownAltIcon />}
              disableElevation
              size="small"
              color="default"
              variant="contained"
              style={{ textTransform: "none", borderRadius: 25 }}
              onClick={handleSubmit}
            >
              {" "}
              Submit claim
            </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} >
  <h1>{" "}</h1>
        </Grid>
    </Grid>
  );
}
