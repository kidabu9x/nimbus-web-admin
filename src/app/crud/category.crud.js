import axios from "axios";

// export const BASE_URL = "https://5e81d2b4c130270016a37701.mockapi.io/api/v1/";
export const BASE_URL = "http://api-internal-uat.nimbus.com.vn/v1/";
// export const BASE_URL = "http://localhost:48080/v1/";

export function getAllCategories() {
  return axios.get(`${BASE_URL}categories`);
}

export function getCategory(categoryId) {
  return axios.get(`${BASE_URL}categories/${categoryId}`);
}

export function updateCategory(categoryId, category) {
  return axios.put(`${BASE_URL}categories/${categoryId}`, category);
}

export function createCategory(category) {
  return axios.post(`${BASE_URL}categories`, category);
}

export function deleteCategory(categoryId) {
  return axios.delete(`${BASE_URL}categories/${categoryId}`);
}
