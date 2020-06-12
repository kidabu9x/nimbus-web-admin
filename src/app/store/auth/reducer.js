import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
    LOGOUT,
    USER_LOADED,
    GET_PROFILE_REQUESTING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR,
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from "./constants";

const intialState = {
    user: null,
    token: null,

    requesting: true,
    successful: false,

    loginRequesting: false
};

const reducer = persistReducer(
    { storage, key: "nimbus-auth", whitelist: ["token"] },
    (state = intialState, action) => {
        switch (action.type) {

            case LOGIN_REQUESTING: {
                return {
                    loginRequesting: true,
                    user: null
                };
            }

            case LOGIN_SUCCESS: {
                const { token } = action.payload;
                return {
                    loginRequesting: false,
                    token
                };
            }

            case LOGIN_ERROR: {
                return {
                    loginRequesting: false,
                    token: null
                }
            }

            case LOGOUT: {
                return {
                    ...intialState,
                    requesting: false
                };
            }

            case USER_LOADED: {
                const { user } = action.payload;

                return { ...state, user };
            }

            case GET_PROFILE_REQUESTING: {
                return {
                    ...state,
                    requesting: true
                }
            }

            case GET_PROFILE_SUCCESS: {
                const { user } = action.payload;
                return {
                    ...state,
                    requesting: false,
                    successful: true,
                    user
                }
            }

            case GET_PROFILE_ERROR: {
                return {
                    ...state,
                    requesting: false,
                    successful: false,
                    user: null
                }
            }

            default:
                return state;
        }
    }
);

export default reducer;
