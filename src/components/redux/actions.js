import * as actions from './actionTypes';

// you never work with the rducer, the store directly contacts ther reducer
// you use actions to tell the store what to do and then store contacts reducer
// reducer sends the updated state back to the store


export const updateRecipeList = newSearchRecipeList => ({
    type: actions.SEARCH_RECIPE, 
    searchRecipeList: newSearchRecipeList
})


export const updateSelectedRecipe = newSelectedRecipe => ({
    type: actions.SELECTED_RECIPE, 
    selectedRecipe: newSelectedRecipe
})

