import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PanToolIcon from '@material-ui/icons/PanTool';
import SocialShare from './SocialShare'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import { getImgUrl } from '../js/utils'
import EditIcon from '@material-ui/icons/Edit';
import { useTrackedState } from 'reactive-react-redux'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    minHeight: 500,
    position: "relative",
  },
}));

export default function Header({ selectedProject }) {
  const classes = useStyles();
  const { authData } = useTrackedState();
  const [editPermission, setEditPermission] = React.useState(false);
  const [approvePermission, setApprovePermission] = React.useState(false);
  const [approved, setApproved] = React.useState(true)
  // console.log(selectedProject)
  let history = useHistory();
  React.useEffect(() => {
    window.scrollTo(0, 0)
    setEditPermission((authData&&authData.user&&authData.user.staff==='yes')
    || (selectedProject && selectedProject._source.owners 
      && selectedProject._source.owners === authData.user.id));
    setApprovePermission(authData&&authData.user&&authData.user.staff==='yes')
    setApproved(selectedProject&&selectedProject._source.approved==='yes')
  }, [authData])
  return (
    <Grid item xs={12}>
      {selectedProject ? (
        <Paper
          className={`${classes.paper} dash-header-div`}
          style={{
            backgroundImage: "url(" + getImgUrl(selectedProject._source.image) + ")",
          }}
        >
          {/* <Title selectedProject={selectedProject}/> */}
          <Button 
          color='primary' 
          startIcon={<NavigateBeforeIcon />}
          variant="contained" 
          size="small" 
          onClick={() => history.goBack()}
          style={{marginBottom:10}}
          >Back
          </Button>

          {editPermission?
          <Button 
          color='primary' 
          endIcon={<EditIcon />}
          variant="contained" 
          size="small" 
          onClick={() => history.push('/edit-project')}
          style={{marginBottom:10, marginLeft:10}}
          >Edit
          </Button>
          :null}

          {approvePermission?
          <Button
          disabled={approved?true:false}
          color='primary' 
          endIcon={approved?<CheckCircleIcon/>:<ThumbUpIcon />}
          variant="contained" 
          size="small" 
          onClick={() => history.push('/edit-project')}
          style={{marginBottom:10, marginLeft:10}}
          >{approved?'Approved':'Approve'}
          </Button>
          :null}
          <div 
          style={{ backgroundColor: "rgba(255,255,255, 0.8)" 
          , borderRadius:5, padding:10, fontWeight:700, color:'black'}}>
          <h1 style={{wordWrap: 'break-word' }}>{selectedProject? selectedProject._source.title:null}</h1>
            <h5>{selectedProject? selectedProject._source.subtitle:null}</h5>

          </div>
          <div
            style={{
              position: "absolute",
              bottom: 10,
            }}

            // left: "50%",
            // transform: `translateX(-50%)`,
          >
            <IconButton
              color="secondary"
              aria-label="add to favorites"
              style={{ backgroundColor: "rgba(110, 110, 110, 0.8)"}}
            >
              <FavoriteIcon />
            </IconButton>
            <SocialShare />
            <IconButton
              color="secondary"
              aria-label="add to favorites"
              style={{
                backgroundColor: "rgba(110, 110, 110, 0.8)",
                marginLeft: 10,
              }}
            >
              <PanToolIcon />
            </IconButton>

            <IconButton
              color="secondary"
              aria-label="add to favorites"
              style={{
                backgroundColor: "rgba(110, 110, 110, 0.8)",
                marginLeft: 10,
              }}
            >
              <SportsKabaddiIcon />
            </IconButton>

            <IconButton
              color="secondary"
              aria-label="add to favorites"
              style={{
                backgroundColor: "rgba(110, 110, 110, 0.8)",
                marginLeft: 10,
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          </div>
        </Paper>
      ) : null}
    </Grid>
  );
}
