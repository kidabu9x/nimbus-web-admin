import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionBlogTypes = {
  GetAllBlogs: "[GetAllBlogs] Action",
  GetBlog: "[GetBlog] Action",
  GetBlogsSuccess: "[GetBlogsSuccess] Action",
};

const initialBookState = {
  blogsList: [],
};

export const reducer = persistReducer(
  { storage, key: "nimbus-blog", whitelist: [] },
  (state = initialBookState, action) => {
    switch (action.type) {
      case actionBlogTypes.GetAllBlogs: {
        return state;
      }

      case actionBlogTypes.GetBlog: {
        return state;
      }

      case actionBlogTypes.GetBlogsSuccess: {
        return { ...state, blogsList: action.payload };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  getAllBlogs: () => ({
    type: actionBlogTypes.GetAllBlogs,
  }),
  getBlog: (blogId) => ({
    type: actionBlogTypes.GetBlog,
    payload: { blogId },
  }),
  getBlogsSuccess: (data) => ({
    type: actionBlogTypes.GetBlogsSuccess,
    payload: data,
  }),
};

export function* saga() {}
