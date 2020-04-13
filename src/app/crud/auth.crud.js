import axios from "axios";

export const LOGIN_URL = "http://auth-uat.nimbus.com.vn/v1/";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = LOGIN_URL + "profile";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function loginWithGoogle(profObj) {
  const profConv = {
    type: "GOOGLE",
    first_name: profObj.givenName,
    last_name: profObj.familyName,
    email: profObj.email,
    avatar: profObj.imageUrl
  };
  return axios.post(`${LOGIN_URL}oauth2`, profConv);
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
