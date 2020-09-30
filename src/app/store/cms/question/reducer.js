import {
    FILTER_QUESTIONS_REQUESTING,
    FILTER_QUESTIONS_ERROR,
    FILTER_QUESTIONS_SUCCESS,

    CREATE_QUESTION_REQUESTING,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_ERROR,

    UPDATE_QUESTION_REQUESTING,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_ERROR,

    GET_QUESTION_REQUESTING,
    GET_QUESTION_SUCCESS,
    GET_QUESTION_ERROR
} from "./constants";

const initState = {
    questions: [],
    filtering: false,
    page: 0,
    size: 20,
    total: 0,

    creating: false,
    createSuccess: 0,
    createError: 0,

    updating: false,
    updateSuccess: 0,
    updateError: 0,

    question: null,
    getting: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case FILTER_QUESTIONS_REQUESTING: {
            return {
                ...state,
                filtering: true
            };
        }

        case FILTER_QUESTIONS_SUCCESS: {
            const { questions, size, page, total } = action.payload;
            return {
                ...state,
                filtering: false,
                questions,
                page,
                size,
                total
            };
        }

        case FILTER_QUESTIONS_ERROR: {
            return {
                ...state,
                filtering: false,
                questions: [],
                page: 0,
                size: 20,
                total: 0
            };
        }

        case CREATE_QUESTION_REQUESTING: {
            return {
                ...state,
                creating: true
            };
        }

        case CREATE_QUESTION_SUCCESS: {
            const question = action.payload;
            return {
                ...state,
                creating: false,
                questions: state.questions.push(question),
                createSuccess: state.createSuccess += 1
            };
        }

        case CREATE_QUESTION_ERROR: {
            return {
                ...state,
                creating: false,
                createError: state.createError += 1
            };
        }

        case UPDATE_QUESTION_REQUESTING: {
            return {
                ...state,
                updating: true
            };
        }

        case UPDATE_QUESTION_SUCCESS: {
            return {
                ...state,
                updating: false,
                updateSuccess: state.updateSuccess += 1
            };
        }

        case UPDATE_QUESTION_ERROR: {
            return {
                ...state,
                updating: false,
                updateError: state.updateError += 1
            };
        }

        case GET_QUESTION_REQUESTING: {
            return {
                ...state,
                getting: true,
                question: null
            }
        }

        case GET_QUESTION_SUCCESS: {
            const question = action.payload;
            return {
                ...state,
                getting: false,
                question
            }
        }

        case GET_QUESTION_ERROR: {
            return {
                ...state,
                getting: false,
                question: null
            }
        }

        default:
            return state;
    }
};
