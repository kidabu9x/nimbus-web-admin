import axios from "axios";
import config from "../config/apiConfig";

export const BASE_URL = config.domain.blogService + "/v1";

export function getAllBlogs(page = 0, limit = 10, title = null, category_id = null) {
  let queryParams = {
    limit,
    offset: page,
  };
  if (title !== null || title !== "") {
    queryParams.title = title;
  }
  if (category_id !== null) {
    queryParams.category_id = category_id;
  }

  return axios.get(`${BASE_URL}/blogs`, {
    params: queryParams,
  });
}

export function getBlog(blogId) {
  return axios.get(`${BASE_URL}/blogs/${blogId}`);
}

export function updateBlog(blogId, blog) {
  return axios.put(`${BASE_URL}/blogs/${blogId}`, blog);
}

export function createBlog(blog) {
  return axios.post(`${BASE_URL}/blogs`, blog);
}

export function deleteBlog(blogId) {
  return axios.delete(`${BASE_URL}/blogs/${blogId}`);
}
