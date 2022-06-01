import { red } from "@material-ui/core/colors";
// import {stateKeys} from "../redux/actions.js";
// import {setReduxState} from "./helpers";
// import {userType} from "./identifiers";
import { Link, useHistory } from 'react-router-dom'

const TOKEN_KEY = 'token';

export function userLoggedIn() {
    return !!getUserToken();
}

export function getActiveStore() {
    return sessionStorage.getItem(TOKEN_KEY) ? sessionStorage : localStorage;
}

export function getUserToken() {
    return getActiveStore().getItem(TOKEN_KEY)
}

export function loadUserInfo() {
    //Fetch user full details from server using token(recommended)
    //or
    //From local storage
    const data = getActiveStore().getItem(stateKeys.USER)
    const user = data ? JSON.parse(data) : null;

    //This should update redux
    setReduxState(user, stateKeys.USER)
}

export function getUser(key, defaultValue = null) {
    //Get user details from redux (recommended)
    // let data = reduxState(stateKeys.USER)
    // //or
    // //Local/Session storage
    
    // const userData = getActiveStore().getItem(stateKeys.USER);
    // let data = userData ? JSON.parse(userData) : null;

    // if (!data || (key && typeof data[key] === 'undefined')) {
    //     return defaultValue
    // }

    if (localStorage.getItem('user')) {
        return user
    } else {
        return null
    }
}

export function updateUserInfo(data) {
    const userData = getUser();
    let update = Object.assign({}, userData, data);

    getActiveStore().setItem(stateKeys.USER, JSON.stringify(update));
    setReduxState(update, stateKeys.USER)
}

export function loginUser(token, user, role, redirect) {
    const storage = localStorage;
    const history = useHistory();

        console.log(user)
    storage.setItem(TOKEN_KEY, token);
    if (user) {
        storage.setItem(stateKeys.USER, JSON.stringify(user));
        setReduxState(user, stateKeys.USER)
    }

    if (redirect) {
        console.log(token)
        const intended = rememberRoute();
        if (intended) {
            history.push(intended);
        } 
        // else {
        //     console.log(redirect)
        //     history.push('/dashboard');
        //     // window.location = redirect;
        // }
        
        else if (role &&
            (role === 'MANAGER')) {
                console.log('hullo')
            // history.push('/dashboard');
            window.location = "/dashboard/home";
        } else if (role &&
            (role === 'ADMIN')) {
            window.location = "/admin/dashboard";
        } else {
            window.location = "/login";
        }
    }

}

export function rememberRoute() {
    const key = '__intended';
    const old = sessionStorage.getItem(key);
    // sessionStorage.setItem(key, window.location.pathname);

    return old;
}

export function logOutUser(redirect) {
    // getActiveStore().removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(stateKeys.USER);
    sessionStorage.removeItem(stateKeys.USER);

    window.location = redirect ? redirect : '/login';
}
