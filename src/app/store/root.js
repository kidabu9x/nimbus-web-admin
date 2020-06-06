import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import * as blog from "./blog";
import * as category from "./category";

import authSagas from "./auth/sagas";

export const rootReducer = combineReducers({
  auth: authReducer,
  blog: blog.reducer,
  category: category.reducer
});

export function* rootSaga() {
  yield all([
    authSagas()
  ])
}
