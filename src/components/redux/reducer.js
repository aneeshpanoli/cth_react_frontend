import * as actionType from './actionTypes';

const initialState = {
    searchProjectList: [],
    selectedProject: null,

};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SEARCH_PROJECT:
            return {...state, searchProjectList: action.searchProjectList}
        case actionType.SELECTED_PROJECT:
            return {...state, selectedProject: action.selectedProject}
        default: return state
    }
};