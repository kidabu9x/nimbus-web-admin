import {
    LOGIN,
    REGISTER,
    LOGOUT,
    USER_REQUESTED,
    USER_LOADED
} from "./constants";

export const login = (authToken) => ({
    type: LOGIN,
    payload: {
        authToken
    }
});

export const register = (authToken) => ({
    type: REGISTER,
    payload: {
        authToken
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

export const fulfillUser = (user) => ({
    type: USER_LOADED,
    payload: {
        user
    }
});