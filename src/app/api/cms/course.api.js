import axios from "axios";
import config from "../../config/apiConfig";

export const BASE_URL = config.domain.courseService + "/cms/course";

export function filterCourses(
    { page = 0, size = 20, orgIds = [], name = null } = {}
) {
    return axios.post(`${BASE_URL}/filter`, {
        org_ids: orgIds,
        name
    }, {
        params: {
            page,
            size
        }
    });
}

export function createCourse(
    { name = null, orgId = null } = {}
) {
    if (name == null || orgId == null) {
        return;
    }
    return axios.post(`${BASE_URL}`, {
        name,
        org_id: orgId
    });
}


// return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve();
//     }, 5000);
// });