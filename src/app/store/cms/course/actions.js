import {
    CREATE_COURSE_REQUEST,
    FILTER_COURSES_REQUEST,
    GET_COURSE_REQUEST
} from "./constants";

export const filterCourses = (filterObj) => ({
    type: FILTER_COURSES_REQUEST,
    payload: filterObj
});

export const createCourse = (request) => ({
    type: CREATE_COURSE_REQUEST,
    payload: request
});

export const getCourse = (id) => ({
    type: GET_COURSE_REQUEST,
    payload: id
});
