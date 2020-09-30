import { put, call, takeLatest } from "redux-saga/effects";
import {
    createQuestion,
    filterQuestions,
    updateQuestion,
    getQuestion
} from "../../../api/cms/question.api";
import {
    FILTER_QUESTIONS_REQUEST,
    FILTER_QUESTIONS_REQUESTING,
    FILTER_QUESTIONS_ERROR,
    FILTER_QUESTIONS_SUCCESS,

    CREATE_QUESTION_REQUEST,
    CREATE_QUESTION_REQUESTING,
    CREATE_QUESTION_SUCCESS,
    CREATE_QUESTION_ERROR,

    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_REQUESTING,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_ERROR
} from "./constants";

function* filterQuestionsFlow(action) {
    try {
        yield put({
            type: FILTER_QUESTIONS_REQUESTING
        });
        const filterObj = action.payload;
        const response = yield call(filterQuestions, filterObj);
        const questions = response.data.data;
        const { page, size, total } = response.data.meta;
        yield put({
            type: FILTER_QUESTIONS_SUCCESS,
            payload: {
                questions,
                page,
                size,
                total
            }
        });
    } catch (error) {
        yield put({
            type: FILTER_QUESTIONS_ERROR
        });
    }
}

function* createQuestionFlow(action) {
    try {
        yield put({
            type: CREATE_QUESTION_REQUESTING
        });
        const request = action.payload;
        const createRes = yield call(createQuestion, request);
        const id = createRes.data.data;
        const getRes = yield call(getQuestion, id);
        const question = getRes.data.data;

        yield put({
            type: CREATE_QUESTION_SUCCESS,
            payload: question
        });
    } catch (error) {
        yield put({
            type: CREATE_QUESTION_ERROR
        });
    }
}

function* updateQuestionFlow(action) {
    try {
        yield put({
            type: UPDATE_QUESTION_REQUESTING
        });
        const request = action.payload;
        yield call(updateQuestion, request);
        yield put({
            type: UPDATE_QUESTION_SUCCESS
        });
    } catch (error) {
        yield put({
            type: UPDATE_QUESTION_ERROR
        });
    }
}

function* watcher() {
    yield takeLatest(FILTER_QUESTIONS_REQUEST, filterQuestionsFlow);
    yield takeLatest(CREATE_QUESTION_REQUEST, createQuestionFlow);
    yield takeLatest(UPDATE_QUESTION_REQUEST, updateQuestionFlow);
}

export default watcher;