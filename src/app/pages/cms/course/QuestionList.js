import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    CircularProgress,
    Container,
    Typography,
    Button,
    Divider,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";
import CustomUploadAdapterPlugin from "../../../plugin/CustomUploadAdapterPlugin";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CKEditor from '@ckeditor/ckeditor5-react';
import EditorTheme from '@ckeditor/ckeditor5-build-classic';
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
import { useForm, Controller } from "react-hook-form";

const QuestionList = () => {
    const { org, course, courseGetting, quiz, quizGetting, filtering } = useSelector(({ cms }) => ({
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
    const { control, handleSubmit } = useForm();

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

    const onSubmit = data => {
        console.log(data);
    }

    return <Container>

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

        <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
            {
                filtering ?
                    <CircularProgress />
                    :
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box bgcolor="white" p={2} width="530px">
                                <Box mb={2}>
                                    <CKEditor
                                        editor={EditorTheme}
                                        config={{
                                            language: "vi",
                                            toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'imageUpload', 'blockQuote', 'insertTable'],
                                            image: {
                                                upload: {
                                                    types: ['png', 'jpeg']
                                                }
                                            },
                                            extraPlugins: [CustomUploadAdapterPlugin]
                                        }}
                                        onChange={(_, editor) => {
                                            const data = editor.getData();
                                            console.log(data);
                                        }}
                                    />
                                </Box>
                                <Box mt={1} mb={2} display="flex" alignItems="center">
                                    <Box width="30%">
                                        <Typography variant="subtitle1">Loại câu hỏi</Typography>
                                    </Box>
                                    <RadioGroup name="type" row>
                                        <FormControlLabel value="MULTIPLE_CHOICE_ONE_ANSWER" control={<Radio />} label="1 đáp án" />
                                        <FormControlLabel value="MULTIPLE_CHOICE_MULTIPLE_ANSWERS" control={<Radio />} label="Nhiều đáp án" />
                                    </RadioGroup>
                                </Box>

                                <Box mt={1} mb={2} display="flex" alignItems="flex-start">
                                    <Radio
                                        value={false}
                                        name="is_correct"
                                    />
                                    <CKEditor
                                        editor={EditorTheme}
                                        config={{
                                            language: "vi",
                                            toolbar: ['bold', 'italic'],
                                            image: {
                                                upload: {
                                                    types: ['png', 'jpeg']
                                                }
                                            },
                                            extraPlugins: [CustomUploadAdapterPlugin]
                                        }}
                                        onChange={(_, editor) => {
                                            const data = editor.getData();
                                            console.log(data);
                                        }}
                                    />
                                </Box>
                            </Box>

                        </form>
                    </>
            }
        </Box>
    </Container>
}

export default QuestionList;