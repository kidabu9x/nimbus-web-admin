import {
    GET_BLOGS_REQUESTING,
    GET_BLOGS_SUCCESS,
    GET_BLOGS_ERROR
} from "./constants";

const blogs = {
    blogs: [],
    pagination: {
        limit: 10,
        offset: 0,
        total: 0,
    },
    title: null,
    requesting: false
}

const initialBlogState = {
    ...blogs
};

export default (state = initialBlogState, action) => {
    switch (action.type) {
        case GET_BLOGS_REQUESTING: {
            state.requesting = true;
            state.pagination.offset = action.payload.offset;
            state.title = action.payload.searchTerm;
            return {
                ...state,
            };
        }

        case GET_BLOGS_SUCCESS: {
            state.requesting = false;
            state.blogs = action.payload.blogs;
            state.pagination.total = action.payload.total;
            return {
                ...state
            };
        }

        case GET_BLOGS_ERROR: {
            state.requesting = false;
            state.blogs = [];
            state.pagination.total = 0;
            state.pagination.offset = 0;
            return {
                ...state
            };
        }
        default:
            return state;
    }
};
