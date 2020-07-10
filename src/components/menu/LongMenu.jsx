import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MORE_LIKE_THIS } from '../backend/EsQueries'
import { queryElasticsearch } from '../backend/AxiosRequest'
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { updateProjectList } from '../redux/actions'
import PagesIcon from '@material-ui/icons/Pages';




const ITEM_HEIGHT = 48;

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const { searchRecipeList } = useTrackedState()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleSimilarProjects = () => {
    setAnchorEl(null);
    let query = MORE_LIKE_THIS(
      props.r._source.storyText? props.r._source.storyText:props.r._source.subtitle, ['storyText']
        );
    queryElasticsearch("", query, dispatch, updateProjectList);
  };

  const handleSimilarStack = () => {
    setAnchorEl(null);
    let query = MORE_LIKE_THIS(
        props.r._source.builtWith, ['builtWith']
        );
    queryElasticsearch("", query, dispatch, updateProjectList);
  };

  const handleSimilarCountry= () => {
    setAnchorEl(null);
    let query = MORE_LIKE_THIS(
        props.r._source.country, ['country']
        );
    queryElasticsearch(props.r._source.country, query, dispatch, updateProjectList);
  };

  const handleSimilarHackathon= () => {
    setAnchorEl(null);
    let query = MORE_LIKE_THIS(
        props.r._source.hackathons, ['hackathons']
        );
    queryElasticsearch("",query, dispatch, updateProjectList);
  };


  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PagesIcon />
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
          <MenuItem onClick={handleSimilarProjects}>
            <span> Find Similar Projects</span></MenuItem>
            :null}
          
          
          {props.r._source.builtWith[0]? 
          <MenuItem onClick={handleSimilarStack}><span> Find Similar Tech Stack</span>
          </MenuItem>
          :null}
         
          
          
          {props.r._source.country? <MenuItem onClick={handleSimilarCountry}>
            <span>Find more from {props.r._source.country}</span></MenuItem>:null}
          
          
         {props.r._source.hackathons[0]? <MenuItem onClick={handleSimilarHackathon}>
           <span>Find more from {props.r._source.hackathons[0]}</span></MenuItem>:null}
          
      </Menu>
    </div>
  );
}
