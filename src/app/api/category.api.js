import axios from "axios";
import config from "../config/apiConfig";

export const BASE_URL = config.domain.blogService + "/v1";

export function getAllCategories() {
  return axios.get(`${BASE_URL}/categories`);
}

export function getCategory(categoryId) {
  return axios.get(`${BASE_URL}/categories/${categoryId}`);
}

export function updateCategory(categoryId, category) {
  return axios.put(`${BASE_URL}/categories/${categoryId}`, category);
}

export function createCategory(category) {
  return axios.post(`${BASE_URL}/categories`, category);
}

export function deleteCategory(categoryId) {
  return axios.delete(`${BASE_URL}/categories/${categoryId}`);
}
