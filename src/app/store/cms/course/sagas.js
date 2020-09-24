import { put, call, takeLatest } from "redux-saga/effects";
import {
    filterCourses
} from "../../../api/cms/course.api";
import {
    FILTER_COURSES_REQUESTING,
    FILTER_COURSES_ERROR,
    FILTER_COURSES_SUCCESS
} from "./constants";

function* filterCoursesFollow(action) {
    try {
        const filterObj = action.payload;
        const response = yield call(filterCourses, filterObj);
        const courses = response.data.data;
        const { page, size, total } = response.data.meta;
        yield put({
            type: FILTER_COURSES_SUCCESS,
            payload: {
                courses,
                page,
                size,
                total
            }
        });
    } catch (error) {
        yield put({
            type: FILTER_COURSES_ERROR
        });
    }
}

function* watcher() {
    yield takeLatest(FILTER_COURSES_REQUESTING, filterCoursesFollow);
}

export default watcher;