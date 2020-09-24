import {
    FILTER_COURSES_REQUESTING
} from "./constants";

export const filterCourses = (filterObj) => ({
    type: FILTER_COURSES_REQUESTING,
    payload: filterObj
});
