import {
    GET_BLOGS_REQUESTING,
    GET_BLOGS_SUCCESS,
    GET_BLOGS_ERROR,
    DELETE_BLOG_REQUESTING,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_ERROR
} from "./constants";

const blogs = {
    blogs: [],
    pagination: {
        limit: 0,
        page: 0,
        total: 0,
    },
    filter: {
        searchTerm: null,
        categoryId: null
    },
    reload: 0,
    requesting: false
}

export default (state = blogs, action) => {
    switch (action.type) {
        case GET_BLOGS_REQUESTING: {
            const { page, limit, searchTerm } = action.payload;
            return {
                ...state,
                requesting: true,
                filter: {
                    ...state.filter,
                    searchTerm,
                },
                pagination: {
                    ...state.pagination,
                    limit,
                    page
                }
            };
        }

        case GET_BLOGS_SUCCESS: {
            const { blogs, total } = action.payload;
            return {
                ...state,
                requesting: false,
                blogs,
                pagination: {
                    ...state.pagination,
                    total
                }
            };
        }

        case GET_BLOGS_ERROR: {
            return {
                ...state,
                requesting: false,
                blogs: [],
                pagination: {
                    ...state.pagination,
                    total: 0,
                    page: 0
                }
            };
        }

        case DELETE_BLOG_REQUESTING: {
            return {
                ...state,
                requesting: true
            }
        }

        case DELETE_BLOG_SUCCESS: {

            return {
                ...state,
                reload: state.reload += 1,
                requesting: false
            }
        }

        case DELETE_BLOG_ERROR: {
            return {
                ...state,
                requesting: false
            }
        }

        default:
            return state;
    }
};
