import * as actions from './actionTypes';

const initialState = {
    searchRecipeList: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEARCH_RECIPE:
            return {...state, searchRecipeList: action.searchRecipeList}
        default: return state
    }
};