import {
    FILTER_ORGANIZATIONS_REQUESTING,
    FILTER_ORGANIZATIONS_ERROR,
    FILTER_ORGANIZATIONS_SUCCESS
} from "./constants";

const blogs = {
    orgs: [],
    requesting: false
}

export default (state = blogs, action) => {
    switch (action.type) {
        case FILTER_ORGANIZATIONS_REQUESTING: {
            return {
                ...state,
                requesting: true,
                orgs: []
            };
        }

        case FILTER_ORGANIZATIONS_SUCCESS: {
            const { orgs } = action.payload;
            return {
                ...state,
                requesting: false,
                orgs
            };
        }

        case FILTER_ORGANIZATIONS_ERROR: {
            return {
                ...state,
                requesting: false,
                blogs: []
            };
        }

        default:
            return state;
    }
};
