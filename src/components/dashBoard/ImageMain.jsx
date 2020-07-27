import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';

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
import { useTrackedState, useDispatch } from 'reactive-react-redux'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { queryEsById, updateProject } from '../backend/AxiosRequest'
import { updateSelectedProject} from '../redux/actions'
import { MATCH_ID_TITLE } from '../backend/EsQueries'


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
  const dispatch = useDispatch()
  let history = useHistory();
  const approveProject = () =>{
    let data = {
      status: "projectapprove",
      index: selectedProject._index,
      id: selectedProject._id,
      q: {approved:'yes'}
    };
    let formData = new FormData();

    formData.append("params", JSON.stringify(data));
   
    let query = MATCH_ID_TITLE(selectedProject._id, selectedProject._source.title.replace(/-/g, " "));
    const updateData = () => queryEsById(query, dispatch, updateSelectedProject, history);
    updateProject(formData, authData.key, history, selectedProject._source.title, updateData);
  }
  // console.log(selectedProject)
  
  React.useEffect(() => {
    window.scrollTo(0, 0)
    setEditPermission((authData&&authData.user&&authData.user.staff==='yes')
    || (selectedProject && selectedProject._source.owners 
      && (authData.user&&selectedProject._source.owners === authData.user.id)));
    setApprovePermission(authData&&authData.user&&authData.user.staff==='yes')
    setApproved(selectedProject&&selectedProject._source.approved==='yes')
  }, [authData])
  return (
    <Box className={`${classes.paper} dash-header-div`}
    style={{
      backgroundImage: "url(" + getImgUrl(selectedProject._source.image) + ")",
    }}>
      {selectedProject ? (
      
        <Container
          
        >
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
          onClick={approveProject}
          style={{marginBottom:10, marginLeft:10}}
          >{approved?'Approved':'Approve'}
          </Button>
          :null}
          
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
        </Container>
      ) : null}
    </Box>
  );
}
