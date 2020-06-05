import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import * as blog from "./blog";
import * as category from "./category";

export const rootReducer = combineReducers({
  auth: authReducer,
  blog: blog.reducer,
  category: category.reducer
});

export function* rootSaga() {

}
