import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { keyBy } from "lodash";

export const actionBlogTypes = {
  GetAllBlogs: "[GetAllBlogs] Action",
  GetBlog: "[GetBlog] Action",
  GetBlogsSuccess: "[GetBlogsSuccess] Action",
  GetPageBlog: "[GetPageBlog] Action",
  GetBlogSuccess: "[GetBlogSuccess] Action",
};

const initialBlogState = {
  blogsList: [],
  blogData: {},
  total: 0,
  pagination: {
    page: 0,
    limit: 10,
    offset: 0,
  },
};

export const reducer = persistReducer(
  { storage, key: "nimbus-blog", whitelist: [] },
  (state = initialBlogState, action) => {
    switch (action.type) {
      case actionBlogTypes.GetAllBlogs: {
        return state;
      }

      case actionBlogTypes.GetBlogSuccess: {
        return {
          ...state,
          blogData: { ...state.blogData, [action.payload.id]: action.payload },
        };
      }

      case actionBlogTypes.GetPageBlog: {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            page: action.payload,
          },
        };
      }

      case actionBlogTypes.GetBlogsSuccess: {
        const newData = keyBy(action.payload.data, "id");
        return {
          ...state,
          blogsList:
            action.payload.meta.offset !== 0
              ? state.blogsList.concat(action.payload.data)
              : action.payload.data,
          blogData:
            action.payload.meta.offset !== 0
              ? { ...state.blogData, ...newData }
              : { ...newData },
          total: action.payload.meta.total,
          pagination: {
            page: action.payload.meta.offset,
            limit: 10,
            offset: action.payload.meta.offset,
          },
        };
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
  getBlogSuccess: (data) => ({
    type: actionBlogTypes.GetBlogSuccess,
    payload: data,
  }),
  getPageBlog: (page) => ({
    type: actionBlogTypes.GetPageBlog,
    payload: page,
  }),
};

export function* saga() {}
