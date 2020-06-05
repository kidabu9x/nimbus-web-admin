import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
    LOGIN,
    REGISTER,
    LOGOUT,
    USER_LOADED,
    GET_PROFILE_REQUESTING,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_ERROR
} from "./constants";

const intialState = {
    user: undefined,
    authToken: undefined,
    requesting: false,
    successful: false
};

const reducer = persistReducer(
    { storage, key: "nimbus-auth", whitelist: ["user", "authToken"] },
    (state = intialState, action) => {
        switch (action.type) {

            case LOGIN: {
                const { authToken } = action.payload;

                return { authToken, user: undefined };
            }

            case REGISTER: {
                const { authToken } = action.payload;

                return { authToken, user: undefined };
            }

            case LOGOUT: {
                return intialState;
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
