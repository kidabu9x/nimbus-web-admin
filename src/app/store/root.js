import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import blogsReducer from "./blogs/reducer";
import * as category from "./category";

import authSagas from "./auth/sagas";
import blogsSagas from "./blogs/sagas";

export const rootReducer = combineReducers({
  auth: authReducer,
  blogs: blogsReducer,
  category: category.reducer
});

export function* rootSaga() {
  yield all([
    authSagas(),
    blogsSagas()
  ])
}
