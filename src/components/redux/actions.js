import * as actionType from './actionTypes';

// you never work with the rducer, the store directly contacts ther reducer
// you use actions to tell the store what to do and then store contacts reducer
// reducer sends the updated state back to the store


export const updateProjectList = newsearchProjectList => ({
    type: actionType.SEARCH_PROJECT, 
    searchProjectList: newsearchProjectList
})


export const updateSelectedProject = newselectedProject => ({
    type: actionType.SELECTED_PROJECT, 
    selectedProject: newselectedProject
})


export const updateAuthData = newAuthData => ({
    type: actionType.AUTH_DATA, 
    authData: newAuthData
})



export const updateChallengeFormData = newChallengeFormData => ({
    type: actionType.PROJECT_FORM, 
    challengeFormData: newChallengeFormData
})

export const updateFilterProject = newFilterProjectList => ({
    type: actionType.FILTER_PROJECT, 
    filterProjectList: newFilterProjectList
})

export const updateProgress = newIsProgress => ({
    type: actionType.UPDATE_PROGRESS, 
    isProgress: newIsProgress
})