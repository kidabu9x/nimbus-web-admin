import {
    GET_CATEGORIES_REQUESTING,
    DELETE_CATEGORY_REQUESTING,
    UPDATE_CATEGORY_REQUESTING,
    CREATE_CATEGORY_REQUESTING
} from "./constants";

export const getCategories = () => ({
    type: GET_CATEGORIES_REQUESTING
});

export const deleteCategory = ({
    id
}) => ({
    type: DELETE_CATEGORY_REQUESTING,
    payload: {
        id
    }
});

export const updateCategory = ({
    id,
    category
}) => ({
    type: UPDATE_CATEGORY_REQUESTING,
    payload: {
        id,
        category
    }
});

export const createCategory = (data) => ({
    type: CREATE_CATEGORY_REQUESTING,
    payload: {
        ...data
    }
});
