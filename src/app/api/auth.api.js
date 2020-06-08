import axios from "axios";
import config from "../config/apiConfig";

export const LOGIN_URL = config.domain.authService + "/v1";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = LOGIN_URL + "/profile";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function loginWithGoogle(data) {
  const profConv = {
    type: "GOOGLE",
    first_name: data.givenName,
    last_name: data.familyName,
    email: data.email,
    avatar: data.imageUrl
  };
  return axios.post(`${LOGIN_URL}/oauth2`, profConv);
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserProfile() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
