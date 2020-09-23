import axios from "axios";
import config from "../../config/apiConfig";

export const BASE_URL = config.domain.courseService;

export function filterOrgs() {
    return axios.post(`${BASE_URL}/cms/org/filter`, {});
}

