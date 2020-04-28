import axios from "axios";
import config from "../config/index";
console.log(config);

export const BASE_URL = config.domain.blogService + "/v1";

const queryPagination = (page) => {
  return {
    page,
    limit: 10,
    offset: page,
  };
};

export function getAllBlogs(page = 0, title = null, category_id = null) {
  let queryParams = queryPagination(page);
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
  return axios.delete(`${BASE_URL}blogs/${blogId}`);
}
