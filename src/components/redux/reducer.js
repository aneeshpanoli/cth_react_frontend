import * as actionType from './actionTypes';

const initialState = {
    searchProjectList: null,
    filterProjectList: null,
    selectedProject: null,
    isProgress: false,
    challengeFormData: {
        owners: [], // emails
        skills: [],
        createdDate:new Date(),
        updatedDate:new Date(),
        numLikes:0,
        numShares:0,
        solvers: [], //emails
        title: "",
        primeArea: "Web development",
        description: "",
        deadLine: new Date(),
        procedure: "",
      },
      authData: {
        token: null,
        error: null,
        loading: false,
        isAuthenticated: false,
      },
      userInfo: null,
      userOwnChallenge: null,

};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SEARCH_PROJECT:
            return {...state, searchProjectList: action.searchProjectList}
        case actionType.CHALLENGE_FORM:
            return { ...state, challengeFormData: action.challengeFormData };
        case actionType.SELECTED_PROJECT:
            return {...state, selectedProject: action.selectedProject}
        case actionType.AUTH_DATA:
            return { ...state, authData: action.authData };
        case actionType.USER_INFO:
            return { ...state, userInfo: action.userInfo };
        case actionType.FILTER_PROJECT:
            return { ...state, filterProjectList: action.filterProjectList };
        case actionType.UPDATE_PROGRESS:
            return { ...state, isProgress: action.isProgress };
        default: return state
    }
};