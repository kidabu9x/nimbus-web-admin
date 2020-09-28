import {
    FILTER_QUIZZES_REQUESTING,
    FILTER_QUIZZES_ERROR,
    FILTER_QUIZZES_SUCCESS,

    CREATE_QUIZ_REQUESTING,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_ERROR,

    GET_QUIZ_REQUESTING,
    GET_QUIZ_SUCCESS,
    GET_QUIZ_ERROR
} from "./constants";

const initState = {
    quizzes: [],
    filtering: false,
    page: 0,
    size: 20,
    total: 0,

    creating: false,
    createSuccess: 0,
    createError: 0,

    quiz: null,
    getting: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case FILTER_QUIZZES_REQUESTING: {
            return {
                ...state,
                filtering: true
            };
        }

        case FILTER_QUIZZES_SUCCESS: {
            const { quizzes, size, page, total } = action.payload;
            return {
                ...state,
                filtering: false,
                quizzes,
                page,
                size,
                total
            };
        }

        case FILTER_QUIZZES_ERROR: {
            return {
                ...state,
                filtering: false,
                quizzes: [],
                page: 0,
                size: 20,
                total: 0
            };
        }

        case CREATE_QUIZ_REQUESTING: {
            return {
                ...state,
                creating: true
            };
        }

        case CREATE_QUIZ_SUCCESS: {
            return {
                ...state,
                creating: false,
                createSuccess: state.createSuccess += 1
            };
        }

        case CREATE_QUIZ_ERROR: {
            return {
                ...state,
                creating: false,
                createError: state.createError += 1
            };
        }

        case GET_QUIZ_REQUESTING: {
            return {
                ...state,
                getting: true,
                quiz: null
            }
        }

        case GET_QUIZ_SUCCESS: {
            const quiz = action.payload;
            return {
                ...state,
                getting: false,
                quiz
            }
        }

        case GET_QUIZ_ERROR: {
            return {
                ...state,
                getting: false,
                quiz: null
            }
        }

        default:
            return state;
    }
};
