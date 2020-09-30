import {
    FILTER_QUESTIONS_REQUEST,
    CREATE_QUESTION_REQUEST,
    UPDATE_QUESTION_REQUEST,
    GET_QUESTION_REQUEST
} from "./constants";

export const filterQuestions = (filterObj) => ({
    type: FILTER_QUESTIONS_REQUEST,
    payload: filterObj
});

export const createQuestion = (request) => ({
    type: CREATE_QUESTION_REQUEST,
    payload: request
});

export const updateQuestion = (request) => ({
    type: UPDATE_QUESTION_REQUEST,
    payload: request
});

export const getQuestion = (id) => ({
    type: GET_QUESTION_REQUEST,
    payload: id
});
