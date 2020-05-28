import * as actions from './actionTypes';

const initialState = {
    searchRecipeList: [],
    selectedRecipe: [],

};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEARCH_RECIPE:
            return {...state, searchRecipeList: action.searchRecipeList}
        case actions.SELECTED_RECIPE:
            return {...state, selectedRecipe: action.selectedRecipe}
        default: return state
    }
};