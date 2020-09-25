import { put, call, takeLatest, select } from "redux-saga/effects";
import {
    createCourse,
    filterCourses,
    getCourse
} from "../../../api/cms/course.api";
import {
    FILTER_COURSES_REQUEST,
    FILTER_COURSES_REQUESTING,
    FILTER_COURSES_ERROR,
    FILTER_COURSES_SUCCESS,

    CREATE_COURSE_REQUEST,
    CREATE_COURSE_REQUESTING,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_ERROR,

    GET_COURSE_REQUEST,
    GET_COURSE_REQUESTING,
    GET_COURSE_SUCCESS,
    GET_COURSE_ERROR
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

function* getCourseFolow(action) {
    try {
        yield put({
            type: GET_COURSE_REQUESTING
        });
        const courses = yield select(state => {
            return state.cms.course.courses;
        });
        const id = action.payload;
        let course = courses.filter(c => c.id === parseInt(id))[0];
        if (!course) {
            const response = yield call(getCourse, id);
            course = response.data.data;
        }
        yield put({
            type: GET_COURSE_SUCCESS,
            payload: course
        });
    } catch (error) {
        yield put({
            type: GET_COURSE_ERROR
        });
    }
}

function* watcher() {
    yield takeLatest(FILTER_COURSES_REQUEST, filterCoursesFollow);
    yield takeLatest(CREATE_COURSE_REQUEST, createCourseFollow);
    yield takeLatest(GET_COURSE_REQUEST, getCourseFolow);
}

export default watcher;