import axios from "axios";
import config from "../../config/apiConfig";

export const BASE_URL = config.domain.courseService + "/cms/quiz";

export function filterQuizzes(
    { page = 0, size = 20, courseIds = [], name = null } = {}
) {
    return axios.post(`${BASE_URL}/filter`, {
        course_ids: courseIds,
        name
    }, {
        params: {
            page,
            size
        }
    });
}

export function createQuiz(
    { name = null, courseId = null } = {}
) {
    if (name == null || courseId == null) {
        return;
    }
    return axios.post(`${BASE_URL}`, {
        name,
        course_id: courseId
    });
}

export function getQuiz(
    id
) {
    if (id == null) {
        return;
    }
    return axios.get(`${BASE_URL}/${id}`);
}

// return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve();
//     }, 5000);
// });