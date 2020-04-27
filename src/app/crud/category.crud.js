import axios from "axios";

// export const BASE_URL = "https://5e81d2b4c130270016a37701.mockapi.io/api/v1/";
// export const BASE_URL = process.env.BASE_URL;
// export const BASE_URL = "http://localhost:48080/v1/";

export function getAllCategories() {
  return axios.get(`${process.env.REACT_APP_BASE_URL}categories`);
}

export function getCategory(categoryId) {
  return axios.get(`${process.env.REACT_APP_BASE_URL}categories/${categoryId}`);
}

export function updateCategory(categoryId, category) {
  return axios.put(`${process.env.REACT_APP_BASE_URL}categories/${categoryId}`, category);
}

export function createCategory(category) {
  return axios.post(`${process.env.REACT_APP_BASE_URL}categories`, category);
}

export function deleteCategory(categoryId) {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}categories/${categoryId}`);
}
