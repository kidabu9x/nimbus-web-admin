import axios from "axios";
import config from "../../config/apiConfig";

export const BASE_URL = config.domain.courseService + "/cms/question";

export function filterQuestions(
    { page = 0, size = 20, quiz_ids = [], course_ids = [], content = null } = {}
) {
    return axios.post(`${BASE_URL}/filter`, {
        quiz_ids,
        course_ids,
        content
    }, {
        params: {
            page,
            size
        }
    });
}

export function createQuestion(
    {
        answers = [
            {
                "content": null,
                "description": null,
                "is_correct": true,
            }
        ],
        content = null,
        course_id = 0,
        description = null,
        position = 0,
        quiz_id = 0,
        type = "MULTIPLE_CHOICE_ONE_ANSWER"
    } = {}
) {
    if (content === null || course_id === null || quiz_id === null || answers === null || answers.length === 0) {
        return;
    }
    return axios.post(`${BASE_URL}`, {
        answers,
        content,
        course_id,
        quiz_id,
        description,
        position,
        type
    });
}

export function updateQuestion(
    {
        id = null,
        answers = [
            {
                id: null,
                content: null,
                description: null,
                is_correct: true,
            }
        ],
        content = null,
        course_id = 0,
        description = null,
        position = 0,
        quiz_id = 0,
        type = "MULTIPLE_CHOICE_ONE_ANSWER"
    } = {}
) {
    if (id === null || content === null || course_id === null || quiz_id === null || answers === null || answers.length === 0) {
        return;
    }
    return axios.put(`${BASE_URL}/${id}`, {
        answers,
        content,
        course_id,
        quiz_id,
        description,
        position,
        type
    });
}

export function getQuestion(
    id
) {
    if (id == null) {
        return;
    }
    return axios.get(`${BASE_URL}/${id}`);
}

export function deleteQuestion(
    {
        id = null,
        quiz_id = null
    }
) {
    if (id === null || quiz_id === null) {
        return;
    }
    return axios.delete(`${BASE_URL}`, {
        data: {
            question_id: id,
            quiz_id: quiz_id
        }
    });
}

// return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve();
//     }, 5000);
// });