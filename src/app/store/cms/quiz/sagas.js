import { put, call, takeLatest, select } from "redux-saga/effects";
import {
    filterQuizzes,
    createQuiz,
    getQuiz
} from "../../../api/cms/quiz.api";
import {
    FILTER_QUIZZES_REQUEST,
    FILTER_QUIZZES_REQUESTING,
    FILTER_QUIZZES_ERROR,
    FILTER_QUIZZES_SUCCESS,

    CREATE_QUIZ_REQUEST,
    CREATE_QUIZ_REQUESTING,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_ERROR,

    GET_QUIZ_REQUEST,
    GET_QUIZ_REQUESTING,
    GET_QUIZ_SUCCESS,
    GET_QUIZ_ERROR
} from "./constants";

function* filterQuizzesFlow(action) {
    try {
        yield put({
            type: FILTER_QUIZZES_REQUESTING
        });
        const filterObj = action.payload;
        const response = yield call(filterQuizzes, filterObj);
        const quizzes = response.data.data;
        const { page, size, total } = response.data.meta;
        yield put({
            type: FILTER_QUIZZES_SUCCESS,
            payload: {
                quizzes,
                page,
                size,
                total
            }
        });
    } catch (error) {
        yield put({
            type: FILTER_QUIZZES_ERROR
        });
    }
}

function* createQuizFlow(action) {
    try {
        yield put({
            type: CREATE_QUIZ_REQUESTING
        });
        const request = action.payload;
        yield call(createQuiz, request);
        yield put({
            type: CREATE_QUIZ_SUCCESS
        });
    } catch (error) {
        yield put({
            type: CREATE_QUIZ_ERROR
        });
    }
}

function* getQuizFlow(action) {
    try {
        const id = parseInt(action.payload);
        let quiz = yield select(state => {
            return state.cms.quiz.quiz;
        });
        if (quiz != null && quiz.id === id) {
            return;
        }
        yield put({
            type: GET_QUIZ_REQUESTING
        });
        const quizzes = yield select(state => {
            return state.cms.quiz.quizzes;
        });

        quiz = quizzes.filter(c => c.id === id)[0];
        if (!quiz) {
            const response = yield call(getQuiz, id);
            quiz = response.data.data;
        }
        yield put({
            type: GET_QUIZ_SUCCESS,
            payload: quiz
        });
    } catch (error) {
        yield put({
            type: GET_QUIZ_ERROR
        });
    }
}

function* watcher() {
    yield takeLatest(FILTER_QUIZZES_REQUEST, filterQuizzesFlow);
    yield takeLatest(CREATE_QUIZ_REQUEST, createQuizFlow);
    yield takeLatest(GET_QUIZ_REQUEST, getQuizFlow);
}

export default watcher;