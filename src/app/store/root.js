import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./auth";
import * as blog from "./blog";
import * as category from "./category";
import { metronic } from "../../_metronic";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  blog: blog.reducer,
  category: category.reducer,
  i18n: metronic.i18n.reducer,
  builder: metronic.builder.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
