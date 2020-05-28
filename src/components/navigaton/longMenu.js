import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as BuildQuery from '../data/EsQueries'
import { queryElasticsearch } from '../data/axiosComponent'
import { useDispatch, useTrackedState } from 'reactive-react-redux';



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
  const handleSimilarRecipes = () => {
    // console.log(searchRecipeList[props.selectedRecipe]);
    setAnchorEl(null);
    let query = BuildQuery.MORE_LIKE_THIS(
        searchRecipeList[props.selectedRecipe]._source.instructions, ['instructions']
        );
    queryElasticsearch(query, dispatch);
  };

  const handleSimilarIngredients = () => {
    // console.log(searchRecipeList[props.selectedRecipe]);
    setAnchorEl(null);
    let query = BuildQuery.MORE_LIKE_THIS(
        searchRecipeList[props.selectedRecipe]._source.ingredients, ['ingredients']
        );
    queryElasticsearch(query, dispatch);
  };

  const handleSimilarDish = () => {
    // console.log(searchRecipeList[props.selectedRecipe]);
    setAnchorEl(null);
    let query = BuildQuery.MORE_LIKE_THIS(
        searchRecipeList[props.selectedRecipe]._source.title, ['title']
        );
    queryElasticsearch(query, dispatch);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
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
          <MenuItem onClick={handleSimilarRecipes}>
          Find Similar Instructions
          </MenuItem>
          <MenuItem onClick={handleSimilarIngredients}>
          Find Similar Ingredients
          </MenuItem>
          <MenuItem onClick={handleSimilarDish}>
          Find Similar Dish
          </MenuItem>
      </Menu>
    </div>
  );
}
