import {
    FILTER_COURSES_REQUESTING,
    FILTER_COURSES_ERROR,
    FILTER_COURSES_SUCCESS,

    CREATE_COURSE_REQUESTING,
    CREATE_COURSE_SUCCESS,
    CREATE_COURSE_ERROR,

    GET_COURSE_REQUESTING,
    GET_COURSE_SUCCESS,
    GET_COURSE_ERROR
} from "./constants";

const blogs = {
    courses: [],
    filtering: false,
    page: 0,
    size: 20,
    total: 0,

    creating: false,
    createSuccess: 0,
    createError: 0,

    course: null,
    getting: false
}

export default (state = blogs, action) => {
    switch (action.type) {
        case FILTER_COURSES_REQUESTING: {
            return {
                ...state,
                filtering: true
            };
        }

        case FILTER_COURSES_SUCCESS: {
            const { courses, size, page, total } = action.payload;
            return {
                ...state,
                filtering: false,
                courses,
                page,
                size,
                total
            };
        }

        case FILTER_COURSES_ERROR: {
            return {
                ...state,
                filtering: false,
                courses: [],
                page: 0,
                size: 20,
                total: 0
            };
        }

        case CREATE_COURSE_REQUESTING: {
            return {
                ...state,
                creating: true
            };
        }

        case CREATE_COURSE_SUCCESS: {
            return {
                ...state,
                creating: false,
                createSuccess: state.createSuccess += 1
            };
        }

        case CREATE_COURSE_ERROR: {
            return {
                ...state,
                creating: false,
                createError: state.createError += 1
            };
        }

        case GET_COURSE_REQUESTING: {
            return {
                ...state,
                getting: true,
                course: null
            }
        }

        case GET_COURSE_SUCCESS: {
            const course = action.payload;
            return {
                ...state,
                getting: false,
                course
            }
        }

        case GET_COURSE_ERROR: {
            return {
                ...state,
                getting: false,
                course: null
            }
        }

        default:
            return state;
    }
};
