import { put, call, takeLatest } from "redux-saga/effects";
import {
    filterOrgs
} from "../../../api/cms/org.api";
import {
    FILTER_ORGANIZATIONS_REQUESTING,
    FILTER_ORGANIZATIONS_ERROR,
    FILTER_ORGANIZATIONS_SUCCESS
} from "./constants";

function* filterOrgsFollow() {
    try {
        const response = yield call(filterOrgs);
        const orgs = response.data.data;
        yield put({
            type: FILTER_ORGANIZATIONS_SUCCESS,
            payload: {
                orgs
            }
        });
    } catch (error) {
        yield put({
            type: FILTER_ORGANIZATIONS_ERROR
        });
    }
}

function* watcher() {
    yield takeLatest(FILTER_ORGANIZATIONS_REQUESTING, filterOrgsFollow);
}

export default watcher;