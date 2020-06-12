import {
    GET_BLOG_REQUESTING,
    GET_BLOG_SUCCESS,
    GET_BLOG_ERROR,
    DELETE_BLOG_REQUESTING,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_ERROR,
    CREATE_BLOG_REQUESTING,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_ERROR,
    UPDATE_BLOG_REQUESTING,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_ERROR,
    RESET_BLOG,
    RESET_MESSAGE
} from "./constants";

const blog = {
    blog: {
        id: null,
        title: "",
        contents: [
            {
                content: "Chèn nội dung",
                type: "HTML", // HTML
            },
        ],
        tags: [],
        description: "",
        status: "DISABLED", // DELETED, PUBLISHED, DISABLED
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
        authors: [],
        categories: [],
        thumbnail: null,
        extra_data: {
            facebook_pixel_id: "",
            google_analytics_id: "",
        },
    },
    reload: 0,
    requesting: false,
    redirectCount: 0,
    errorMessage: null,
    successMessage: null
}

export default (state = blog, action) => {
    switch (action.type) {
        case RESET_BLOG: {
            return {
                ...state,
                blog: blog.blog
            }
        }

        case RESET_MESSAGE: {
            return {
                ...state,
                errorMessage: null,
                successMessage: null
            }
        }

        case GET_BLOG_REQUESTING: {
            return {
                ...state,
                requesting: true
            };
        }
        case GET_BLOG_SUCCESS: {
            const { blog } = action.payload;
            return {
                ...state,
                requesting: false,
                blog
            };
        }
        case GET_BLOG_ERROR: {
            const {
                message
            } = action.payload;
            return {
                ...state,
                requesting: false,
                errorMessage: message
            };
        }
        case CREATE_BLOG_REQUESTING: {
            return {
                ...state,
                requesting: true
            };
        }

        case CREATE_BLOG_SUCCESS: {
            const { blog } = action.payload;
            return {
                ...state,
                requesting: false,
                successMessage: "Tạo blog thành công",
                redirectCount: state.redirectCount += 1,
                blog
            };
        }
        case CREATE_BLOG_ERROR: {
            const {
                message
            } = action.payload;
            return {
                ...state,
                errorMessage: message,
                requesting: false
            };
        }

        case UPDATE_BLOG_REQUESTING: {
            return {
                ...state,
                requesting: true
            };
        }
        case UPDATE_BLOG_SUCCESS: {
            return {
                ...state,
                successMessage: "Cập nhật blog thành công",
                requesting: false
            };
        }
        case UPDATE_BLOG_ERROR: {
            const {
                message
            } = action.payload;
            return {
                ...state,
                errorMessage: message,
                requesting: false
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
            const {
                message
            } = action.payload;
            return {
                ...state,
                errorMessage: message,
                requesting: false
            }
        }

        default:
            return state;
    }
};
