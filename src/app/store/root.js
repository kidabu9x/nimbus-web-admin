import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import blogsReducer from "./blogs/reducer";
import blogReducer from "./blog/reducer";
import categoriesReducer from "./categories/reducer";

import authSagas from "./auth/sagas";
import blogsSagas from "./blogs/sagas";
import blogSagas from "./blog/sagas";
import categoriesSagas from "./categories/sagas";

export const rootReducer = combineReducers({
  auth: authReducer,
  blogs: blogsReducer,
  blog: blogReducer,
  categories: categoriesReducer
});

export function* rootSaga() {
  yield all([
    authSagas(),
    blogsSagas(),
    categoriesSagas(),
    blogSagas()
  ])
}
