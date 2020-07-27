import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useTrackedState, useDispatch } from "reactive-react-redux";
import Avatar from "@material-ui/core/Avatar";
import StarsIcon from '@material-ui/icons/Stars';
import EditIcon from '@material-ui/icons/Edit';
import { getAnotherUserInfoElastic } from "../backend/AxiosRequest";
import { updateOtherUserData } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    alignContent: "right",
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 100,
    backgroundColor: "grey",
  },
  project: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    fontWeight: 700,
    fontSize:'3rem'
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { authData, otherUserData } = useTrackedState();
  const [personal, setPersonal] = React.useState(true);
  React.useEffect(() =>{
    getAnotherUserInfoElastic(
      authData,
      "username",
      props.username,
      dispatch,
      updateOtherUserData
    );
  })

  React.useEffect(() =>{
    setPersonal((authData.user && otherUserData) && authData.user.id==otherUserData.id)
  }, [otherUserData])

  const handleFollow = () =>{

  }

  return (
    <React.Fragment>
      <Grid container spacing={2} alignItems="center">
        <Grid item md={2} sm={4} xs={3} container justify="flex-end">
        <Avatar
            variant="circle"
            color="secondary"
            className={classes.project}
            // alt={authData.user ? authData.user.first_name : null}
            src="/static/images/avatar/1.jpg"
          />
          
        </Grid>
        
        <Grid item md={10} sm={8} xs={9} container justify="flex-start">
          <h4>
            {authData.user
              ? otherUserData.first_name + " " + otherUserData.last_name
              : null}
          </h4>

          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            {personal?
            <React.Fragment>
            <span style={{color:'grey'}}>{authData.user
              ? authData.user.email
              : null}</span><br/>
              </React.Fragment>
              :null}
              
           {authData.user?authData.user.followers.length:0} Followers  
              <br/>
              {authData.user?authData.user.likes.length:0} Following
        </Grid>
        {personal?
       
        
        <Grid item md={12} sm={12} xs={12} >
        <Button
          startIcon={<EditIcon />}
          disableElevation
          size="small"
          color="default"
          variant="contained"
          style={{ textTransform: "none", borderRadius: 25}}
          onClick={handleFollow}
        >
          Edit profile
        </Button>
        </Grid>
        :
        <Grid item md={12} sm={12} xs={12} >
        <Button
          startIcon={<StarsIcon />}
          disableElevation
          size="small"
          color="default"
          variant="contained"
          style={{ textTransform: "none", borderRadius: 25}}
          onClick={handleFollow}
        >
          {" "}
          Follow
        </Button>
        </Grid>
}
      </Grid>


      {/* <Paper className={classes.paper} elevation={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: "pointer" }}
                ></Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  style={{ cursor: "pointer" }}
                ></Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">--</Typography>
            </Grid>
            <Grid container justify="space-between">
              <Grid item>Followers, Likes, Projects, solving</Grid>
            </Grid>
            <hr />
            <Grid container alignItems="flex-end">
              <Grid item>
                <UserProfileMenu />
              </Grid>
              <Grid>
                <GreyRoundButton onClick={props.onClick}>
                  My Projects
                </GreyRoundButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper> */}
    </React.Fragment>
  );
}
