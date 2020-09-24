import { put, call, takeLatest } from "redux-saga/effects";
import {
    filterOrgs
} from "../../../api/cms/org.api";
import {
    FILTER_ORGANIZATIONS_REQUESTING,
    FILTER_ORGANIZATIONS_ERROR,
    FILTER_ORGANIZATIONS_SUCCESS,
    SET_CURRENT_ORGANIZATION,
    SET_CURRENT_ORGANIZATION_REQUEST
} from "./constants";

function* filterOrgsFlow() {
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

function* setOrgFlow(action) {
    const id = action.payload;
    yield put({
        type: SET_CURRENT_ORGANIZATION,
        payload: id
    });
}

function* watcher() {
    yield takeLatest(FILTER_ORGANIZATIONS_REQUESTING, filterOrgsFlow);
    yield takeLatest(SET_CURRENT_ORGANIZATION_REQUEST, setOrgFlow);
}

export default watcher;