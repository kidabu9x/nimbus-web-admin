import axios from "axios";

// export const BASE_URL = "https://5e81d2b4c130270016a37701.mockapi.io/api/v1/";
export const BASE_URL = "http://api-internal-uat.nimbus.com.vn/v1/";
// export const BASE_URL = "http://localhost:48080/v1/";

export function getAllBlogs() {
  return axios.get(`${BASE_URL}blogs`);
}

export function getBlog(blogId) {
  return axios.get(`${BASE_URL}blogs/${blogId}`);
}

export function updateBlog(blogId, blog) {
  return axios.put(`${BASE_URL}blogs/${blogId}`, blog);
}

export function createBlog(blog) {
  return axios.post(`${BASE_URL}blogs`, blog);
}

export function deleteBlog(blogId) {
  return axios.delete(`${BASE_URL}blogs/${blogId}`);
}
