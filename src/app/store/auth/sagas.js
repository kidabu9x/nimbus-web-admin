import { takeLatest, put, call } from "redux-saga/effects";
import {
    getUserProfile
} from "../../api/auth.api";
import {
    GET_PROFILE_REQUESTING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR
} from "./constants";

function* flow() {
    try {
        const response = yield call(getUserProfile);
        console.log(response);
        yield put({ type: GET_PROFILE_SUCCESS });
    } catch (error) {
        console.log(error);
        yield put({ type: GET_PROFILE_ERROR });
    }
}

function* watcher() {
    yield takeLatest(GET_PROFILE_REQUESTING, flow);
}

export default watcher;