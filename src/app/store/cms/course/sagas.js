import { put, call, takeLatest } from "redux-saga/effects";
import {
    createCourse,
    filterCourses
} from "../../../api/cms/course.api";
import {
    FILTER_COURSES_REQUEST,
    FILTER_COURSES_REQUESTING,
    FILTER_COURSES_ERROR,
    FILTER_COURSES_SUCCESS,

    CREATE_COURSE_REQUEST,
    CREATE_COURSE_REQUESTING,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_ERROR
} from "./constants";

function* filterCoursesFollow(action) {
    try {
        yield put({
            type: FILTER_COURSES_REQUESTING
        });
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

function* createCourseFollow(action) {
    try {
        yield put({
            type: CREATE_COURSE_REQUESTING
        });
        const request = action.payload;
        yield call(createCourse, request);
        yield put({
            type: CREATE_COURSE_SUCCESS
        });
    } catch (error) {
        yield put({
            type: CREATE_COURSE_ERROR
        });
    }
}

function* watcher() {
    yield takeLatest(FILTER_COURSES_REQUEST, filterCoursesFollow);
    yield takeLatest(CREATE_COURSE_REQUEST, createCourseFollow);
}

export default watcher;