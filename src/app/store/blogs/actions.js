import {
    GET_BLOGS_REQUESTING,
    DELETE_BLOG_REQUESTING
} from "./constants";

export const getBlogs = ({
    page,
    limit,
    searchTerm,
    categoryId
}) => ({
    type: GET_BLOGS_REQUESTING,
    payload: {
        page,
        limit,
        searchTerm,
        categoryId
    }
});

export const deleteBlog = ({
    id
}) => ({
    type: DELETE_BLOG_REQUESTING,
    payload: {
        id
    }
})
