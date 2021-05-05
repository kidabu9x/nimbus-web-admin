import axios from "axios";
import config from "../../config/apiConfig";

export const BASE_URL = config.domain.courseService + "/cms/course-code";

export function filterCodes(
    { page = 0, size = 20, courseId = null, q = null, statuses = [] } = {}
) {
    return axios.post(`${BASE_URL}/filter`, {
        course_id: courseId,
        q,
        statuses
    }, {
        params: {
            page,
            size
        }
    });
}

export function createCode(
    { courseId = null, limitNumberOfUses = 0, name = null, status = "ACTIVE", useLimit = false } = {}
) {
    if (courseId == null || name == null) {
        return;
    }
    return axios.post(`${BASE_URL}`, {
        name,
        course_id: courseId,
        limit_number_of_uses: limitNumberOfUses,
        status,
        use_limit: useLimit
    });
}

export function updateCode(
    { id = null, courseId = null, limitNumberOfUses = 0, name = null, status = "ACTIVE", useLimit = false } = {}
) {
    if (id == null || courseId == null || name == null) {
        return;
    }
    return axios.put(`${BASE_URL}/${id}`, {
        name,
        course_id: courseId,
        limit_number_of_uses: limitNumberOfUses,
        status,
        use_limit: useLimit
    });
}

export function deleteCode(
    { id = null } = {}
) {
    if (id == null) {
        return;
    }
    return axios.delete(`${BASE_URL}/${id}`);
}
