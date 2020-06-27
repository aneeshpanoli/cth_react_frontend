import { authCheck, quickAuthCheck } from '../auth/auth'


export const saveSessionStore = (key, value) =>{
    sessionStorage.setItem(key, JSON.stringify(value));
}

export const retriveSessionStore = (key, dispatch, actionCallBack) =>{
    const storeData = JSON.parse(sessionStorage.getItem(key));
    dispatch(actionCallBack(storeData))

}