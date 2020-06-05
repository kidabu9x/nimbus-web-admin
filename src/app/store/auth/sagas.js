import { takeLatest } from "redux-saga/effects";
import {
    getUserProfile
} from "../../api/auth.api";
import {
    GET_PROFILE_REQUESTING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR
} from "./constants";

function* flow(action) {
    try {

    } catch (error) {

    }
}

function* watcher() {
    yield takeLatest(GET_PROFILE_REQUESTING, flow);
}

export default watcher;