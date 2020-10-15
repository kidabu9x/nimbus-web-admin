import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    CircularProgress,
    Container,
    Typography,
    Button,
    Divider,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton,
    FormHelperText,
    LinearProgress
} from "@material-ui/core";
import CustomUploadAdapterPlugin from "../../../plugin/CustomUploadAdapterPlugin";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
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
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

let renderCount = 0;

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
    orgId = parseInt(orgId);
    courseId = parseInt(courseId);
    quizId = parseInt(quizId);

    const dispatch = useDispatch();
    renderCount++;
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

    return <Container>
        <Typography variant="body1">
            {renderCount}
        </Typography>
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
                        <Question courseId={courseId} quizId={quizId} />
                    </>
            }
        </Box>
    </Container>
}

const QuestionYupSchema = yup.object().shape({
    course_id: yup.number().required("Bắt buộc"),
    quiz_id: yup.number().required("Bắt buộc"),
    content: yup.string().required("*Bắt buộc"),
    answers: yup.array().of(yup.object().shape({
        id: yup.number(),
        content: yup.string().required("*Không được bỏ trống"),
        description: yup.string(),
        is_correct: yup.bool()
    }))
        .required("Tối thiểu có 1 câu trả lời đúng")
        .min(1, "Tối thiểu có 1 câu trả lời đúng")
});

const Question = ({ courseId, quizId }) => {
    const [requesting, setRequesting] = useState(false);
    const { control, handleSubmit, register, setValue, errors } = useForm({
        defaultValues: {
            "answers": [
                {
                    "content": "",
                    "description": "",
                    "id": null,
                    "is_correct": true
                }
            ],
            "content": "",
            "course_id": courseId,
            "description": "",
            "id": null,
            "position": 0,
            "quiz_id": quizId,
            "type": "MULTIPLE_CHOICE_ONE_ANSWER"
        },
        resolver: yupResolver(QuestionYupSchema),
        mode: "onChange"
    });

    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: "answers"
        }
    );

    useEffect(() => {
        register("content");
    })

    const onSubmit = data => {
        console.log(data);
        setRequesting(true);
        setTimeout(() => {
            setRequesting(false);
        }, 5000);
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        <input name="quiz_id" ref={register} type="hidden" />
        <input name="course_id" ref={register} type="hidden" />
        <Box bgcolor="white" p={2} width="530px">
            {requesting && <LinearProgress />}
            <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">Câu hỏi mới</Typography>
                <IconButton aria-label="delete" disabled={requesting}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box mb={2}>
                <CKEditor
                    editor={EditorTheme}
                    disabled={requesting}
                    config={{
                        language: "vi",
                        toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'imageUpload', 'blockQuote', 'insertTable'],
                        image: {
                            upload: {
                                types: ['png', 'jpeg']
                            }
                        },
                        extraPlugins: [CustomUploadAdapterPlugin],
                        placeholder: "Nhập câu hỏi"
                    }}
                    onChange={(_, editor) => {
                        const data = editor.getData();
                        setValue("content", data)
                    }}

                />
                {errors.content && <FormHelperText error>{errors.content.message}</FormHelperText>}
            </Box>
            <Box mt={1} mb={2} display="flex" alignItems="center">
                <Box width="30%">
                    <Typography variant="subtitle1">Loại câu hỏi</Typography>
                </Box>
                <Controller
                    as={
                        <RadioGroup aria-label="type" row>
                            <FormControlLabel value="MULTIPLE_CHOICE_ONE_ANSWER" control={<Radio color="primary" />} label="1 đáp án" disabled={requesting} />
                            <FormControlLabel value="MULTIPLE_CHOICE_MULTIPLE_ANSWERS" control={<Radio color="primary" />} label="Nhiều đáp án" disabled={requesting} />
                        </RadioGroup>
                    }
                    name="type"
                    control={control}
                />
            </Box>
            <Box mb={4}>
                {fields.map((answer, index) => (
                    <Fragment key={index}>
                        <Divider />
                        <input name={`answers[${index}].id`} ref={register()} defaultValue={`${answer.id}`} type="hidden" />
                        <Box mt={1} display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="subtitle1">Câu trả lời {index + 1}</Typography>
                            <IconButton aria-label="delete" onClick={() => remove(index)} disabled={requesting}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box mt={1} mb={2}>
                            <Box display="flex" alignItems="flex-start">
                                <Controller
                                    render={({ value, onChange }) => <Radio color="primary" checked={value} onChange={(e) => onChange(e.target.value)} disabled={requesting} />}
                                    name={`answers[${index}].is_correct`}
                                    control={control}
                                    defaultValue={answer.is_correct}
                                />
                                <Controller
                                    render={({ onChange }) => (
                                        <CKEditor
                                            editor={EditorTheme}
                                            disabled={requesting}
                                            config={{
                                                language: "vi",
                                                toolbar: ['bold', 'italic', '|', 'imageUpload'],
                                                image: {
                                                    upload: {
                                                        types: ['png', 'jpeg']
                                                    }
                                                },
                                                extraPlugins: [CustomUploadAdapterPlugin],
                                                placeholder: "Câu trả lời"
                                            }}
                                            onChange={(_, editor) => {
                                                const data = editor.getData();
                                                onChange(data);
                                            }}
                                        />
                                    )}
                                    name={`answers[${index}].content`}
                                    control={control}
                                    defaultValue={answer.content} // make sure to set up defaultValue
                                />
                            </Box>
                            <Box pl={6}>
                                {errors.answers && errors.answers[index] && errors.answers[index].content && <FormHelperText error>{errors.answers[index].content.message}</FormHelperText>}
                            </Box>
                        </Box>

                    </Fragment>
                ))}
                {errors.answers && <FormHelperText error>{errors.answers.message}</FormHelperText>}
            </Box>

            <Divider />
            <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
                <Button
                    onClick={() => {
                        append({ id: null, content: "", is_correct: false });
                    }}
                    disabled={requesting}
                >
                    Thêm câu trả lời
                </Button>
                <Box>
                    <Button disabled={requesting}>Hủy</Button>
                    <Button variant="contained" color="primary" disableElevation type="submit" disabled={requesting}>Lưu</Button>
                </Box>
            </Box>
        </Box>

    </form>;
}

export default QuestionList;