

export const saveSessionStore = (key, value) =>{
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const retriveSessionStore = (key, dispatch, actionCallBack) =>{
    console.log("loading from session")
    const storeData = JSON.parse(sessionStorage.getItem(key));
    dispatch(actionCallBack(storeData))
    return storeData? true:false
}

