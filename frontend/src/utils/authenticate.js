import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
// import {userType} from "./Identifiers";
import {getUser, loadUserInfo, userLoggedIn} from "./auth";

export const AuthRoute = withRouter(({component: Component, path, authorized = [], ...rest}) => {
    if (userLoggedIn()) {
        const user = getUser();
        if (!user) {
            //Update full details from server
            loadUserInfo();
        }

        //Authorization
        if (authorized.length && user) {
            const userType = user.userType;
            if (!authorized.includes(userType)) {
                return <Redirect from={path} to={`/login`}/>
            }
        }

        return <Route path={path} component={Component} {...rest}/>
    } else
        return <Redirect from={path} to={`/login`}/>
});

export function userAuthenticated() {
    return !!getAuthToken()
}

export function getAuthToken() {
    return localStorage.getItem('token')
}

export function getThisUser() {
    return localStorage.getItem('user')
}

export const PrivateRoute = (({component: Component, path, authorized = [], ...rest}) => {
    if (userAuthenticated()) {
        const user = JSON.parse(getThisUser())

        if (authorized.length && user) {
            const userType = user.owner ? user.owner.userType : user.userType;
            if (!authorized.includes(userType)) {
                return <Redirect from={path} to={`/login`}/>
            }
        }

        return <Route path={path} component={Component} {...rest}/>
    } else {
        return <Redirect from={path} to={`/login`}/>
    }
})