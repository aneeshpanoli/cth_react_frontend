import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MORE_LIKE_THIS } from '../backend/EsQueries'
import { queryElasticsearch } from '../backend/AxiosRequest'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateProjectList } from '../redux/actions'
import PagesIcon from '@material-ui/icons/Pages';
import { CircularProgress } from '@material-ui/core';
import { useHistory} from 'react-router-dom'




const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const { filterProjectList } = useTrackedState()
  const [progress, setProgress] = React.useState(false);
  const history = useHistory()
  React.useEffect(() => {
    setTimeout(() => {  setProgress(false); }, 2000);
    
 }, [filterProjectList]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSimilarity = (column) => {
    setAnchorEl(null);
    setProgress(true);
    const goTo = () =>{
      history.push('/search')
    }
    let query = MORE_LIKE_THIS(
        props.r._id, [column]
        );
    queryElasticsearch("", query, dispatch, updateProjectList, goTo);
  };


  return (
    <div>
      <IconButton
        aria-label="more"
        size='small'
        color="secondary"
        aria-controls="long-menu"
        aria-haspopup="true"
        style={{backgroundColor:'#1C3557'}}
        onClick={handleClick}
      >
       {progress?  <CircularProgress size={30} color='secondary'/> : <PagesIcon /> } 
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 'auto',
          },
        }}
      >
          
          {props.r._source.storyText || props.r._source.subtitle? 
          <MenuItem onClick={()=>handleSimilarity('storyText')}>
            <span> Find Similar Projects</span></MenuItem>
            :null}
          
          
          {props.r._source.builtWith[0]? 
          <MenuItem onClick={()=>handleSimilarity('builtWith')}><span> Find Similar Tech Stack</span>
          </MenuItem>
          :null}
         
          
          
          {props.r._source.country? <MenuItem onClick={()=>handleSimilarity('country')}>
            <span>Find more from {props.r._source.country}</span></MenuItem>:null}
          
          
         {props.r._source.hackathons[0]? <MenuItem onClick={()=>handleSimilarity('hackathons')}>
           <span>Find more from {props.r._source.hackathons[0]}</span></MenuItem>:null}
          
      </Menu>
    </div>
  );
}
