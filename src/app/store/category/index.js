import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { keyBy } from "lodash";

export const actionCategoryTypes = {
  GetAllCategories: "[GetAllCategories] Action",
  GetCategory: "[GetCategory] Action",
  GetCategoriesSuccess: "[GetCategoriesSuccess] Action"
};

const initialCategoryState = {
  categoriesList: [],
  categoryData: {}
};

export const reducer = persistReducer(
  { storage, key: "nimbus-category", whitelist: [] },
  (state = initialCategoryState, action) => {
    switch (action.type) {
      case actionCategoryTypes.GetAllCategories: {
        return state;
      }

      case actionCategoryTypes.GetCategory: {
        return state;
      }

      case actionCategoryTypes.GetCategoriesSuccess: {
        return {
          ...state,
          categoriesList: action.payload,
          categoryData: keyBy(action.payload, "id")
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getAllCategories: () => ({
    type: actionCategoryTypes.GetAllCategories
  }),
  getCategory: blogId => ({
    type: actionCategoryTypes.GetCategory,
    payload: { blogId }
  }),
  getCategoriesSuccess: data => ({
    type: actionCategoryTypes.GetCategoriesSuccess,
    payload: data
  })
};

export function* saga() {}
