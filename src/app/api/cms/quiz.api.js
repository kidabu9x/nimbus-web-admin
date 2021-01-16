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

export function getConfig(id) {
    if (id === null) {
        return null;
    }
    return axios.get(`${BASE_URL}/${id}/config`);
}

export function updateConfig(
    {
        quiz_id = null,
        duration = 0,
        limit_number_of_questions = 0,
        reset_question_on_back = true,
        shuffle_questions = true
    }
) {
    if (quiz_id === null) {
        return;
    }
    return axios.put(`${BASE_URL}/${quiz_id}/config`, {
        duration,
        limit_number_of_questions,
        reset_question_on_back,
        shuffle_questions
    });
}