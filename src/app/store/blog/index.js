import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { keyBy } from "lodash";

export const actionBlogTypes = {
  GetAllBlogs: "[GetAllBlogs] Action",
  GetBlog: "[GetBlog] Action",
  GetBlogsSuccess: "[GetBlogsSuccess] Action"
};

const initialBlogState = {
  blogsList: [],
  blogData: {}
};

export const reducer = persistReducer(
  { storage, key: "nimbus-blog", whitelist: [] },
  (state = initialBlogState, action) => {
    switch (action.type) {
      case actionBlogTypes.GetAllBlogs: {
        return state;
      }

      case actionBlogTypes.GetBlog: {
        return state;
      }

      case actionBlogTypes.GetBlogsSuccess: {
        return {
          ...state,
          blogsList: action.payload,
          blogData: keyBy(action.payload, "id")
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getAllBlogs: () => ({
    type: actionBlogTypes.GetAllBlogs
  }),
  getBlog: blogId => ({
    type: actionBlogTypes.GetBlog,
    payload: { blogId }
  }),
  getBlogsSuccess: data => ({
    type: actionBlogTypes.GetBlogsSuccess,
    payload: data
  })
};

export function* saga() {}
