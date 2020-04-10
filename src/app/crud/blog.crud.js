import axios from "axios";

export const BASE_URL = "https://5e81d2b4c130270016a37701.mockapi.io/api/v1/";
// export const BASE_URL = "http://api-internal-uat.nimbus.com.vn/v1/";

export function getAllBlogs() {
  return axios.get(`${BASE_URL}blogs`);
}

export function getBlog(blogId) {
  return axios.get(`${BASE_URL}blog/${blogId}`);
}
