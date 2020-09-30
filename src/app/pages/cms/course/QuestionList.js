import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    CircularProgress,
    Container,
    Typography,
    Button,
    Divider
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    getCourse
} from "../../../store/cms/course/actions";
import {
    getQuiz
} from "../../../store/cms/quiz/actions";
import {
    filterQuestions
} from "../../../store/cms/question/actions";

import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../../router/Routes";

const QuestionList = () => {
    const { org, course, courseGetting, quiz, quizGetting, filtering, questions } = useSelector(({ cms }) => ({
        org: cms.org.org,

        course: cms.course.course,
        courseGetting: cms.course.getting,

        quiz: cms.quiz.quiz,
        quizGetting: cms.quiz.getting,

        questions: cms.question.questions,
        filtering: cms.question.filtering
    }));
    let { orgId, courseId, quizId } = useParams();
    const [page] = useState(0);
    const [size] = useState(50);
    const [content] = useState('');

    orgId = parseInt(orgId);
    courseId = parseInt(courseId);
    quizId = parseInt(quizId);

    const dispatch = useDispatch();

    useEffect(() => {
        if (org != null) {
            dispatch(getCourse(courseId));
        }
    }, [org, courseId, dispatch]);

    useEffect(() => {
        if (course != null) {
            dispatch(getQuiz(quizId));
        }
    }, [course, quizId, dispatch]);

    useEffect(() => {
        if (course !== null && course.id === courseId && quiz !== null && quiz.id === quizId) {
            dispatch(filterQuestions({
                content: content,
                page,
                size,
                quiz_ids: [quizId],
                course_ids: [courseId]
            }));
        }
    }, [course, courseId, quiz, quizId, page, size, content, dispatch]);

    if (courseGetting || quizGetting) {
        return <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress />
        </Box>;
    }
    if (org == null) {
        return <Container>
            <Typography variant="h5">Tổ chức không tồn tại</Typography>
        </Container>;
    }
    else if (course == null) {
        return <Container>
            <Typography variant="h5">Khóa học không tồn tại</Typography>
        </Container>;
    }
    else if (quiz == null) {
        return <Container>
            <Typography variant="h5">Bài trắc nghiệm không tồn tại</Typography>
        </Container>;
    }

    const toggleIsCreate = () => {

    }

    return <Container maxWidth="sm">

        <Link style={{ opacity: ".5" }} to={ROUTES.cms.quiz(orgId, courseId, quizId)}>
            <Button style={{ textTransform: "none" }} startIcon={<ArrowBackIosIcon />}>Bài trắc nghiệm</Button>
        </Link>

        <Box display="flex" justifyContent="space-between" marginTop={1} marginBottom={2}>
            <Typography variant="h5">
                Danh sách câu hỏi
            </Typography>
            <Button
                variant="contained"
                size="medium"
                color="primary"
                disableElevation
                onClick={toggleIsCreate}
            >
                Tạo mới
            </Button>
        </Box>
        <Divider />

        <Box marginTop={2}>
            {filtering ? <Box display="flex" flexDirection="column" alignItems="center">
                <CircularProgress />
            </Box> : null}
        </Box>
    </Container>
}

export default QuestionList;