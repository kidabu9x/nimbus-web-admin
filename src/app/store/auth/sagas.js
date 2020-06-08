import { takeLatest, put, call } from "redux-saga/effects";
import {
    getUserProfile,
    loginWithGoogle
} from "../../api/auth.api";
import {
    GET_PROFILE_REQUESTING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR,
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from "./constants";

function* getProfileFlow() {
    try {
        yield call(getUserProfile);
        yield put({ type: GET_PROFILE_SUCCESS });
    } catch (error) {
        yield put({ type: GET_PROFILE_ERROR });
    }
}

function* loginFlow(data) {
    try {
        const response = yield call(loginWithGoogle, data);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}


function* watcher() {
    yield takeLatest(GET_PROFILE_REQUESTING, getProfileFlow);
    yield takeLatest(LOGIN_REQUESTING, loginFlow);
}

export default watcher;