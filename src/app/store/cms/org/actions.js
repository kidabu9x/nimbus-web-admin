import {
    FILTER_ORGANIZATIONS_REQUESTING,
    SET_CURRENT_ORGANIZATION_REQUEST
} from "./constants";

export const filterOrgs = () => ({
    type: FILTER_ORGANIZATIONS_REQUESTING
});

export const setOrgById = (id) => ({
    type: SET_CURRENT_ORGANIZATION_REQUEST,
    payload: id
});
