import {
    FILTER_ORGANIZATIONS_REQUESTING,
    FILTER_ORGANIZATIONS_ERROR,
    FILTER_ORGANIZATIONS_SUCCESS,
    SET_CURRENT_ORGANIZATION
} from "./constants";

const initState = {
    orgs: [],
    requesting: false,
    org: null
}

export default (state = initState, action) => {
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
                orgs: []
            };
        }

        case SET_CURRENT_ORGANIZATION: {
            const id = action.payload;
            const filtered = state.orgs.filter(o => {
                return o.id === parseInt(id);
            });
            return {
                ...state,
                org: filtered[0]
            }
        }

        default:
            return state;
    }
};
