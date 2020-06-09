import {
    GET_BLOGS_REQUESTING
} from "./constants";

export const getBlogs = ({
    searchTerm,
    page,
    categoryId
}) => ({
    type: GET_BLOGS_REQUESTING,
    payload: {
        searchTerm,
        page,
        categoryId
    }
});
