import {
    LOGOUT,
    USER_REQUESTED,
    USER_LOADED,
    GET_PROFILE_REQUESTING,
    LOGIN_REQUESTING
} from "./constants";

export const login = (data) => ({
    type: LOGIN_REQUESTING,
    payload: {
        data
    }
});

export const logout = () => ({
    type: LOGOUT
});

export const requestUser = (user) => ({
    type: USER_REQUESTED,
    payload: {
        user
    }
});

export const getUserProfile = () => ({
    type: GET_PROFILE_REQUESTING
})

export const fulfillUser = (user) => ({
    type: USER_LOADED,
    payload: {
        user
    }
});