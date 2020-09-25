import {
    CREATE_QUIZ_REQUEST,
    FILTER_QUIZZES_REQUEST,
    GET_QUIZ_REQUEST
} from "./constants";

export const filterQuizzes = (filterObj) => ({
    type: FILTER_QUIZZES_REQUEST,
    payload: filterObj
});

export const createQuiz = (request) => ({
    type: CREATE_QUIZ_REQUEST,
    payload: request
});

export const getQuiz = (id) => ({
    type: GET_QUIZ_REQUEST,
    payload: id
});
