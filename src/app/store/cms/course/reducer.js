import {
    FILTER_COURSES_REQUESTING,
    FILTER_COURSES_ERROR,
    FILTER_COURSES_SUCCESS
} from "./constants";

const blogs = {
    courses: [],
    requesting: false,
    page: 0,
    size: 20,
    total: 0
}

export default (state = blogs, action) => {
    switch (action.type) {
        case FILTER_COURSES_REQUESTING: {
            return {
                ...state,
                requesting: true
            };
        }

        case FILTER_COURSES_SUCCESS: {
            const { courses, size, page, total } = action.payload;
            return {
                ...state,
                requesting: false,
                courses,
                page,
                size,
                total
            };
        }

        case FILTER_COURSES_ERROR: {
            return {
                ...state,
                requesting: false,
                courses: [],
                page: 0,
                size: 20,
                total: 0
            };
        }

        default:
            return state;
    }
};
