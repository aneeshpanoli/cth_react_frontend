import * as actionType from './actionTypes';

const initialState = {
    searchProjectList: null,
    selectedProject: null,
    challengeFormData: {
        owners: [], // emails
        skills: [],
        createdDate:new Date(),
        updatedDate:new Date(),
        numLikes:0,
        numShares:0,
        solvers: [], //emails
        title: "",
        primeArea: "Bioinformatics",
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
        case actionType.SELECTED_PROJECT:
            return {...state, selectedProject: action.selectedProject}
        case actionType.AUTH_DATA:
            return { ...state, authData: action.authData };
        case actionType.USER_INFO:
            return { ...state, userInfo: action.userInfo };
        default: return state
    }
};