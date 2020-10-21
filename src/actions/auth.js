import axios from "axios"
import * as actionTypes from "./actionTypes";
import * as endpoint from "../api/constants";
import store from '../store';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.token,
        username: data.username,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(endpoint.USER_LOGIN_URL, {
            username: username,
            password: password,
        })
        .then(res => {
            const token = res.data.key;
            const username = JSON.parse(res.config.data).username
            console.log(res)
            const data = {
                token: token,
                username: username
            }
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(data));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authSignup = (firstname, lastname, username, email, password, phone) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(endpoint.USER_REGISTER_URL, {
            first_name: firstname,
            last_name: lastname,
            username: username,
            email: email,
            password: password,
            phone: phone
        })
        .then(res => {
            console.log(res)
            const token = res.data.token;
            const username = JSON.parse(res.config.data).username
            const data = {
                token: token,
                username: username
            }
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(data));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = store.getState().token;
        if (token === undefined) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}