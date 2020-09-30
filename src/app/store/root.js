import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import blogsReducer from "./blogs/reducer";
import blogReducer from "./blog/reducer";
import categoriesReducer from "./categories/reducer";

//cms
import orgReducer from "./cms/org/reducer";
import orgSaga from "./cms/org/sagas";
import courseReducer from "./cms/course/reducer";
import courseSaga from "./cms/course/sagas";
import quizReducer from "./cms/quiz/reducer";
import quizSaga from "./cms/quiz/sagas";
import questionReducer from "./cms/question/reducer";
import questionSaga from "./cms/question/sagas";

import authSagas from "./auth/sagas";
import blogsSagas from "./blogs/sagas";
import blogSagas from "./blog/sagas";
import categoriesSagas from "./categories/sagas";


const cms = combineReducers({
  org: orgReducer,
  course: courseReducer,
  quiz: quizReducer,
  question: questionReducer
});

export const rootReducer = combineReducers({
  auth: authReducer,
  blogs: blogsReducer,
  blog: blogReducer,
  categories: categoriesReducer,
  cms: cms
});

export function* rootSaga() {
  yield all([
    authSagas(),
    blogsSagas(),
    categoriesSagas(),
    blogSagas(),

    orgSaga(),
    courseSaga(),
    quizSaga(),
    questionSaga()
  ])
}
