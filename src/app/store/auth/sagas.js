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
        const response = yield call(getUserProfile);
        const user = response.data.data;
        yield put({
            type: GET_PROFILE_SUCCESS,
            payload: {
                user
            }
        });
    } catch (error) {
        yield put({ type: GET_PROFILE_ERROR });
    }
}

function* loginFlow(action) {
    try {
        const { data } = action.payload;
        const response = yield call(loginWithGoogle, data);
        const metaData = response.data.data;
        const accessToken = metaData != null ? metaData.access_token : null;
        yield put({
            type: LOGIN_SUCCESS,
            payload: {
                token: accessToken
            }
        });
    } catch (error) {
        yield put({
            type: LOGIN_ERROR
        });
    }
}


function* watcher() {
    yield takeLatest(GET_PROFILE_REQUESTING, getProfileFlow);
    yield takeLatest(LOGIN_REQUESTING, loginFlow);
}

export default watcher;