import * as actions from './actionTypes';

const initialState = {
    searchRecipeList: [],
    expanded: false,

};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SEARCH_RECIPE:
            return {...state, searchRecipeList: action.searchRecipeList}
        case actions.SLIDE_SEARCH_RESULTS:
            return {...state, expanded: action.expanded}
        default: return state
    }
};