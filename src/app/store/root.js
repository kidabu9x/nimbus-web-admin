import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./auth";
import * as blog from "./blog";
import * as category from "./category";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  blog: blog.reducer,
  category: category.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
