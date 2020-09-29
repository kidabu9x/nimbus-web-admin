import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    CircularProgress
} from "@material-ui/core";
import {
    getCourse
} from "../../../store/cms/course/actions";
import {
    getQuiz
} from "../../../store/cms/quiz/actions";
import { useParams } from "react-router-dom";

const QuestionList = () => {
    const { org, course, courseGetting, quiz, quizGetting } = useSelector(({ cms }) => ({
        org: cms.org.org,

        course: cms.course.course,
        courseGetting: cms.course.getting,

        quiz: cms.quiz.quiz,
        quizGetting: cms.quiz.getting
    }));
    const { courseId, quizId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (org != null) {
            dispatch(getCourse(courseId));
        }
    }, [org]);

    useEffect(() => {
        if (course != null) {
            dispatch(getQuiz(quizId));
        }
    }, [course]);

    if (courseGetting || quizGetting) {
        return <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress />
        </Box>;
    }
    if (org == null) {
        return <h4>Org không tồn tại</h4>
    }
    else if (course == null) {
        return <h4>Khóa học không tồn tại</h4>;
    }
    else if (quiz == null) {
        return <h4>Bài trắc nghiệm không tồn tại</h4>;
    }

    return <h3>Hello World</h3>
}

export default QuestionList;