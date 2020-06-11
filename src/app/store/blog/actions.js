import {
    GET_BLOG_REQUESTING,
    DELETE_BLOG_REQUESTING,
    CREATE_BLOG_REQUESTING,
    UPDATE_BLOG_REQUESTING,
    RESET_BLOG,
    RESET_MESSAGE
} from "./constants";

export const getBlog = ({
    id
}) => ({
    type: GET_BLOG_REQUESTING,
    payload: {
        id
    }
});

export const deleteBlog = ({
    id
}) => ({
    type: DELETE_BLOG_REQUESTING,
    payload: {
        id
    }
});

export const updateBlog = (data) => ({
    type: UPDATE_BLOG_REQUESTING,
    payload: {
        ...data
    }
});

export const createBlog = (data) => ({
    type: CREATE_BLOG_REQUESTING,
    payload: {
        ...data
    }
});

export const resetBlog = () => ({
    type: RESET_BLOG
});

export const resetMessage = () => ({
    type: RESET_MESSAGE
})