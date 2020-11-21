import React, { Fragment, useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
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
    Checkbox,
    IconButton,
    FormHelperText,
    LinearProgress,
    Menu,
    MenuItem,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
    InputAdornment,
    TextField
} from "@material-ui/core";
import CustomUploadAdapterPlugin from "../../../plugin/CustomUploadAdapterPlugin";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import CKEditor from '@ckeditor/ckeditor5-react';
import EditorTheme from '@ckeditor/ckeditor5-build-classic';
import {
    getCourse
} from "../../../store/cms/course/actions";
import {
    getQuiz
} from "../../../store/cms/quiz/actions";
import { filterQuestions, createQuestion, updateQuestion, getQuestion, deleteQuestion } from "../../../api/cms/question.api";

import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { ROUTES } from "../../../router/Routes";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const QUESTION_TYPE = {
    MULTIPLE_CHOICE_ONE_ANSWER: "MULTIPLE_CHOICE_ONE_ANSWER",
    MULTIPLE_CHOICE_MULTIPLE_ANSWERS: "MULTIPLE_CHOICE_MULTIPLE_ANSWERS"
}

const initQuestion = {
    "answers": [
        {
            "content": "",
            "description": "",
            "id": null,
            "is_correct": true
        }
    ],
    "content": "",
    "description": "",
    "id": null,
    "position": 0,
    "type": QUESTION_TYPE.MULTIPLE_CHOICE_ONE_ANSWER
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const QuestionList = () => {
    const { org, course, quiz } = useSelector(({ cms }) => ({
        org: cms.org.org,
        course: cms.course.course,
        quiz: cms.quiz.quiz
    }));
    let { orgId, courseId, quizId } = useParams();
    const query = useQuery();
    const [page] = useState(0);
    const [size] = useState(50);
    const [content, setContent] = useState(query.get("search"));
    const [questions, setQuestions] = useState([]);
    const [filtering, setFiltering] = useState(false);
    const [isAddNew, setIsAddNew] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    orgId = parseInt(orgId);
    courseId = parseInt(courseId);
    quizId = parseInt(quizId);

    const dispatch = useDispatch();
    const newQuestionRef = useRef();
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
        setFiltering(true);
        filterQuestions({
            content: content,
            page,
            size,
            quiz_ids: [quizId],
            course_ids: [courseId]
        })
            .then(response => {
                setQuestions(response.data.data);
            })
            .catch(error => {
                enqueueSnackbar(error, {
                    variant: "error"
                });
            })
            .finally(() => {
                setFiltering(false);
            })
    }, [courseId, quizId, page, size, content]);

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

    const createNewQuestion = () => {
        toggleIsCreate();
        window.scrollTo({
            behavior: "smooth",
            top: newQuestionRef.current.offsetTop
        });
    }

    const toggleIsCreate = () => {
        setIsAddNew(!isAddNew);
    }

    const onCreated = (question) => {
        setQuestions(questions.concat([question]));
        toggleIsCreate();
        enqueueSnackbar("Tạo mới câu hỏi thành công", {
            variant: "success"
        });
    }

    const onUpdated = (question) => {
        const index = questions.findIndex(q => q.id === question.id);
        questions[index] = question;
        setQuestions([...questions]);
        enqueueSnackbar("Cập nhật câu hỏi thành công", {
            variant: "success"
        });
    }

    const onDeleted = index => {
        enqueueSnackbar("Đã xóa câu hỏi", {
            variant: "success"
        });

        filterQuestions({
            content: content,
            page,
            size,
            quiz_ids: [quizId],
            course_ids: [courseId]
        })
            .then(response => {
                setQuestions(response.data.data);
            })
            .catch(error => {
                enqueueSnackbar(error, {
                    variant: "error"
                });
            })
            .finally(() => {
                setFiltering(false);
            })
    }

    return <Container>
        <Link style={{ opacity: ".5" }} to={ROUTES.cms.quiz(orgId, courseId, quizId)}>
            <Button style={{ textTransform: "none" }} startIcon={<ArrowBackIosIcon />}>Bài trắc nghiệm</Button>
        </Link>

        <Box display="flex" justifyContent="space-between" marginTop={1} marginBottom={2}>
            <Typography variant="h5">
                Danh sách câu hỏi
            </Typography>
            {!isAddNew && <Button
                variant="contained"
                size="medium"
                color="primary"
                disableElevation
                onClick={createNewQuestion}
            >
                Tạo mới
            </Button>}
        </Box>
        <Divider />

        <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
            <SearchBox content={content} setContent={setContent} />
            {
                filtering ?
                    <CircularProgress />
                    :
                    <>
                        {questions.map((question, index) => (
                            <Question
                                key={index}
                                index={index}
                                courseId={courseId}
                                quizId={quizId}
                                question={question}
                                onUpdated={onUpdated}
                                onDeleted={onDeleted}
                                viewable={true}
                                search={content}
                            />
                        ))
                        }
                        <div ref={newQuestionRef}>
                            {isAddNew && <Question
                                courseId={courseId}
                                quizId={quizId}
                                question={initQuestion}
                                onCreated={onCreated}
                                onCancelCreate={toggleIsCreate}
                                viewable={false}
                            />}
                        </div>
                    </>
            }
        </Box>
    </Container>
}

const SearchBox = ({ content, setContent }) => {
    const [localSearch, setLocalSearch] = useState(content);
    const history = useHistory();
    const filterTimeoutRef = useRef(null);

    const onChange = (e) => {
        const value = e.target.value;
        setLocalSearch(value);
        history.push({
            pathname: window.location.pathname,
            search: "?search=" + value
        });
        if (filterTimeoutRef.current) {
            clearTimeout(filterTimeoutRef.current);
        }

        filterTimeoutRef.current = setTimeout(() => {
            setContent(value)
        }, 300);
    }

    return <Box width="530px" mb={4}>
        <TextField
            variant="outlined"
            label="Tìm kiếm"
            value={localSearch}
            onChange={onChange}
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    </Box>
}

const QuestionYupSchema = yup.object().shape({
    course_id: yup.number().required("Bắt buộc"),
    quiz_id: yup.number().required("Bắt buộc"),
    content: yup.string().required("*Bắt buộc"),
    answers: yup.array().of(yup.object().shape({
        content: yup.string().required("*Không được bỏ trống"),
        description: yup.string(),
        is_correct: yup.bool()
    }))
        .required("Tối thiểu có 1 câu trả lời đúng")
        .min(1, "Tối thiểu có 1 câu trả lời đúng")
});

const radioStyles = makeStyles(theme => ({
    root: {
    },
    colorPrimary: {
        '&$disabled': {
            color: theme.palette.primary.main
        }
    },
    disabled: {
        color: theme.palette.primary.main
    }
}));

const Question = ({ index, viewable, courseId, quizId, question, onCreated, onUpdated, onCancelCreate, onDeleted }) => {
    const [requesting, setRequesting] = useState(false);
    const [editMode, setEditMode] = useState(!viewable);
    const [showDelete, setShowDelete] = useState(false);
    const customRadioClasses = radioStyles();

    const { control, handleSubmit, register, setValue, errors, reset, watch } = useForm({
        defaultValues: {
            ...question,
            course_id: courseId,
            quiz_id: quizId
        },
        resolver: yupResolver(QuestionYupSchema)
    });

    const watchType = watch("type");

    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: "answers"
        }
    );
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        register("content");
    });

    const onSubmit = async data => {
        setRequesting(true);
        if (!data.id) {
            try {
                const createRes = await createQuestion(data);
                const id = createRes.data.data;
                const detailRes = await getQuestion(id);
                const question = detailRes.data.data;
                onCreated(question);
            } catch (error) {
                enqueueSnackbar("Đã có lỗi xảy ra", {
                    variant: "error"
                });
            }

        } else {
            try {
                await updateQuestion(data);
                const detailRes = await getQuestion(data.id);
                const question = detailRes.data.data;
                onUpdated(question);
                setRequesting(false);
                setEditMode(false);
                reset({
                    ...question,
                    course_id: courseId,
                    quiz_id: quizId
                });
            } catch (error) {
                setRequesting(false);
                enqueueSnackbar(error.message, {
                    variant: "error"
                });
            }
        }
    }

    const onCancel = () => {
        if (question.id == null) {
            onCancelCreate();
        } else {
            setEditMode(false);
            reset({
                ...question,
                course_id: courseId,
                quiz_id: quizId
            });
        }
    }

    const toggleDelete = () => {
        setShowDelete(!showDelete);
    }

    const onDelete = async () => {
        setRequesting(true);
        try {
            await deleteQuestion(question);
            toggleDelete();
            setRequesting(false);
            onDeleted(index);
        } catch (error) {
            setRequesting(false);
            enqueueSnackbar(error.message, {
                variant: "error"
            });
        }
    }

    const switchCorrectAnswers = (index) => {
        for (let i = 0; i < fields.length; i++) {
            if (i !== index) {
                fields[i].is_correct = false;
            } else {
                fields[i].is_correct = true;
            }
        }
        setValue("answers", fields);
    }

    const onTypeChange = (type) => {
        if (type === QUESTION_TYPE.MULTIPLE_CHOICE_ONE_ANSWER) {
            let firstCorrectIndex = null;
            for (let i = 0; i < fields.length; i++) {
                if (firstCorrectIndex === null && fields[i].is_correct) {
                    firstCorrectIndex = i;
                }
                if (firstCorrectIndex !== null && i !== firstCorrectIndex) {
                    fields[i].is_correct = false;
                }
            }
            setValue("answers", fields);
        }
        setValue("type", type);
    }

    if (editMode) {
        return <form onSubmit={handleSubmit(onSubmit)}>
            <input name="id" ref={register} type="hidden" />
            <input name="quiz_id" ref={register} type="hidden" />
            <input name="course_id" ref={register} type="hidden" />
            <Box bgcolor="white" p={2} width="530px" mb={4}>
                {requesting && <LinearProgress />}
                <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        {index != null ? `Câu hỏi ${index + 1}` : "Câu hỏi mới"}
                    </Typography>
                    <IconButton aria-label="delete" disabled={requesting} onClick={onCancel}>
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
                        data={question.content}
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
                        render={({ value }) =>
                            <RadioGroup aria-label="type" value={value} row onChange={(e) => onTypeChange(e.target.value)}>
                                <FormControlLabel value={QUESTION_TYPE.MULTIPLE_CHOICE_ONE_ANSWER} control={<Radio color="primary" />} label="1 đáp án" disabled={requesting} />
                                <FormControlLabel value={QUESTION_TYPE.MULTIPLE_CHOICE_MULTIPLE_ANSWERS} control={<Radio color="primary" />} label="Nhiều đáp án" disabled={requesting} />
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
                                        name={`answers[${index}].is_correct`}
                                        control={control}
                                        defaultValue={answer.is_correct}
                                        render={({ value, onChange }) =>
                                            watchType === QUESTION_TYPE.MULTIPLE_CHOICE_ONE_ANSWER ?
                                                <Radio color="primary" checked={value} onChange={() => switchCorrectAnswers(index)} disabled={requesting} />
                                                :
                                                <Checkbox color="primary" checked={value} onChange={() => onChange(!value)} disabled={requesting} />
                                        }
                                    />

                                    <Controller
                                        render={({ onChange }) => (
                                            <CKEditor
                                                data={answer.content}
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
                            append({ id: null, content: "", description: "", is_correct: false });
                        }}
                        disabled={requesting}
                    >
                        Thêm câu trả lời
                </Button>
                    <Box>
                        <Button disabled={requesting} onClick={onCancel}>Hủy</Button>
                        <Button variant="contained" color="primary" disableElevation type="submit" disabled={requesting}>Lưu</Button>
                    </Box>
                </Box>
            </Box>
        </form>;
    } else {
        return <Box bgcolor="white" p={2} width="530px" mb={4}>
            <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">
                    {index != null ? `Câu hỏi ${index + 1}` : "Câu hỏi mới"}
                </Typography>
                <PopupState variant="popover" popupId="more-action">
                    {(popupState) => (
                        <React.Fragment>
                            <IconButton
                                {...bindTrigger(popupState)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={() => setEditMode(true)}>Sửa</MenuItem>
                                <MenuItem onClick={() => toggleDelete()}>Xóa</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </Box>
            <Box mb={2}>
                <div className="ck-editor" dangerouslySetInnerHTML={{
                    __html: question.content
                }}></div>
            </Box>
            <Divider />
            <Box mb={4}>
                {question.answers.map((answer, index) => (
                    <Box key={index} mt={1} mb={2}>
                        <Box display="flex" alignItems="flex-start">
                            {question.type === QUESTION_TYPE.MULTIPLE_CHOICE_ONE_ANSWER && <Radio color="primary" checked={answer.is_correct} disabled classes={{
                                root: customRadioClasses.root,
                                colorPrimary: customRadioClasses.colorPrimary,
                                disabled: customRadioClasses.disabled
                            }} />}
                            {question.type === QUESTION_TYPE.MULTIPLE_CHOICE_MULTIPLE_ANSWERS && <Checkbox color="primary" checked={answer.is_correct} disabled classes={{
                                root: customRadioClasses.root,
                                colorPrimary: customRadioClasses.colorPrimary,
                                disabled: customRadioClasses.disabled
                            }} />}
                            <div className="ck-editor" dangerouslySetInnerHTML={{
                                __html: answer.content
                            }}></div>
                        </Box>
                    </Box>
                ))}
            </Box>
            <Dialog
                open={showDelete}
                onClose={toggleDelete}
                disableBackdropClick={requesting}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {requesting && <LinearProgress />}
                <DialogTitle id="alert-dialog-title">Xác nhận xóa câu hỏi này ?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Hành động này sẽ xóa vĩnh viên câu hỏi và không thể khôi phục
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleDelete}>
                        Hủy
                    </Button>
                    <Button onClick={onDelete} color="primary" autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    }

}

export default QuestionList;