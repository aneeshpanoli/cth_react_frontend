import * as actionType from "./actionTypes";

const initialState = {
  searchProjectList: null,
  filterProjectList: null,
  selectedProject: null,
  selectedMT: null,
  selectedSolution: null,
  editProject: null,
  isProgress: false,
  challengeFormData: {
    owners: [], // emails
    skills: [],
    createdDate: new Date(),
    updatedDate: new Date(),
    numLikes: 0,
    numShares: 0,
    solvers: [], //emails
    title: "",
    primeArea: "Web development",
    description: "",
    deadLine: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
    procedure: "",
  },
  commentData: {},
  authData: {
    token: null,
    error: null,
    loading: false,
    isAuthenticated: false,
  },
  userInfo: null,
  userOwnChallenge: null,
  commentsData: [],
  otherUserData: null, // user the current user is looking
  microtaskList: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SEARCH_PROJECT:
      return { ...state, searchProjectList: action.searchProjectList };
    case actionType.CHALLENGE_FORM:
      return { ...state, challengeFormData: action.challengeFormData };
    case actionType.SELECTED_PROJECT:
      return { ...state, selectedProject: action.selectedProject };
    case actionType.SELECTED_MT:
      return { ...state, selectedMT: action.selectedMT };
    case actionType.SELECTED_SOLUTION:
      return { ...state, selectedSolution: action.selectedSolution };
    case actionType.AUTH_DATA:
      sessionStorage.setItem("authData", JSON.stringify(action.authData));
      return { ...state, authData: action.authData };
    case actionType.FILTER_PROJECT:
      return { ...state, filterProjectList: action.filterProjectList };
    case actionType.UPDATE_COMMENTS:
      return { ...state, commentsData: action.commentsData };
    case actionType.UPDATE_PROGRESS:
      return { ...state, isProgress: action.isProgress };
    case actionType.UPDATE_EDIT_PROJECT:
      return { ...state, editProject: action.editProject };
    case actionType.USER_OWN_CHALLENGE:
      return { ...state, userOwnChallenge: action.userOwnChallenge };
    case actionType.OTHER_USER_DATA:
      return { ...state, otherUserData: action.otherUserData };
      case actionType.UPDATE_MICROTASK_LIST:
        return { ...state, microtaskList: action.microtaskList };
    default:
      return state;
  }
};
