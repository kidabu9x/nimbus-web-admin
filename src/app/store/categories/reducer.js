import {
    GET_CATEGORIES_REQUESTING,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    DELETE_CATEGORY_REQUESTING,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    CREATE_CATEGORY_REQUESTING,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    UPDATE_CATEGORY_REQUESTING,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR
} from "./constants";

const categories = {
    categories: [],
    reload: 0,
    requesting: false,
    errorMessage: null
}

export default (state = categories, action) => {
    switch (action.type) {
        case GET_CATEGORIES_REQUESTING: {
            return {
                ...state,
                requesting: true
            };
        }

        case GET_CATEGORIES_SUCCESS: {
            const { categories } = action.payload;
            return {
                ...state,
                requesting: false,
                categories
            };
        }

        case GET_CATEGORIES_ERROR: {
            const {
                message
            } = action.payload;
            return {
                ...state,
                requesting: false,
                categories: [],
                errorMessage: message
            };
        }

        case DELETE_CATEGORY_REQUESTING: {
            return {
                ...state,
                requesting: true
            }
        }
        case DELETE_CATEGORY_SUCCESS: {
            return {
                ...state,
                requesting: false
            }
        }
        case DELETE_CATEGORY_ERROR: {
            const {
                message
            } = action.payload;
            return {
                ...state,
                requesting: false,
                errorMessage: message
            }
        }


        case CREATE_CATEGORY_REQUESTING: {
            return {
                ...state,
                requesting: true
            }
        }
        case CREATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                requesting: false
            }
        }
        case CREATE_CATEGORY_ERROR: {
            const {
                message
            } = action.payload;
            return {
                ...state,
                requesting: false,
                errorMessage: message
            }
        }

        case UPDATE_CATEGORY_REQUESTING: {
            return {
                ...state,
                requesting: true
            }
        }
        case UPDATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                requesting: false
            }
        }
        case UPDATE_CATEGORY_ERROR: {
            const {
                message
            } = action.payload;
            return {
                ...state,
                requesting: false,
                errorMessage: message
            }
        }

        default:
            return state;
    }
};
