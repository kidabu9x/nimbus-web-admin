import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCourse } from "../../../store/cms/course/actions";
import { createQuiz, filterQuizzes } from "../../../store/cms/quiz/actions";
import {
    Divider,
    Box,
    Button,
    CircularProgress,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    LinearProgress,
    makeStyles
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ROUTES } from "../../../router/Routes";

const navItemStyles = makeStyles(theme => ({
    root: {
        textTransform: "none",
        backgroundColor: "#fff",
        border: "1px solid #dadce0",
        borderRadius: "6px",
        margin: theme.spacing(1),
        minWidth: "150px",
        minHeight: "50px",
        textDecoration: "none"
    }
}));

export default function QuizList() {
    const { course, getting, org, filtering, quizzes, creating, createSuccess } = useSelector(({ cms }) => ({
        course: cms.course.course,
        getting: cms.course.getting,
        org: cms.org.org,

        filtering: cms.quiz.filtering,
        quizzes: cms.quiz.quizzes,

        creating: cms.quiz.creating,
        createSuccess: cms.quiz.createSuccess
    }));
    const { courseId } = useParams();
    const dispatch = useDispatch();

    const [isCreate, setIsCreate] = useState(false);
    const [page] = useState(0);
    const [size] = useState(20);
    const [name] = useState(null);
    const [newName, setNewName] = useState('');

    const navClasses = navItemStyles();

    useEffect(() => {
        dispatch(getCourse(courseId));
    }, [courseId, dispatch]);

    useEffect(() => {
        if (org != null && course != null) {
            dispatch(filterQuizzes({
                page,
                size,
                name,
                orgIds: [org.id],
                courseIds: [course.id]
            }));
        }

    }, [page, size, name, org, course, createSuccess, dispatch]);

    useEffect(() => {
        if (createSuccess > 0) {
            setNewName('');
            toggleIsCreate();
        }
    }, [createSuccess]);

    const toggleIsCreate = () => {
        setIsCreate(!isCreate);
    }

    const handleNewName = (event) => {
        setNewName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (creating || !newName) {
            return;
        }

        dispatch(createQuiz({
            name: newName,
            courseId: course.id
        }));
    }

    if (getting) {
        return <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress />
        </Box>;
    }

    if (org == null) {
        return <Container>
            <Typography variant="h5">Tổ chức không tồn tại</Typography>
        </Container>;
    }

    if (course == null) {
        return <Container>
            <Typography variant="h5">Khóa học không tồn tại</Typography>
        </Container>;
    }

    return <Container>
        <Link style={{ opacity: ".5" }} to={ROUTES.cms.course(org.id, course.id)}>
            <Button style={{ textTransform: "none" }} startIcon={<ArrowBackIosIcon />}>Khóa học</Button>
        </Link>

        <Box display="flex" justifyContent="space-between" marginTop={1} marginBottom={2}>
            <Typography variant="h5">
                Bài trắc nghiệm
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

        <Box marginTop={2}>
            {filtering ? <Box display="flex" flexDirection="column" alignItems="center">
                <CircularProgress />
            </Box> : null}

            <Box display="flex" flexWrap="wrap">
                {quizzes.map(quiz => (
                    <Link to={ROUTES.cms.question(org.id, course.id, quiz.id)} key={quiz.id}>
                        <Button classes={navClasses} disableElevation>
                            {quiz.name}
                        </Button>
                    </Link>
                ))}
            </Box>
        </Box>

        <Dialog open={isCreate} onClose={toggleIsCreate} disableBackdropClick={creating} aria-labelledby="create-new-course">
            {creating ? <LinearProgress /> : null}
            <DialogTitle id="create-new-course">Tạo bài trắc nghiệm</DialogTitle>
            <form onSubmit={onSubmit}>
                <DialogContent>
                    <DialogContentText>
                        Tạo bài trắc nghiệm mới đơn giản bằng cách nhập tên bài trắc nghiệm mà bạn muốn
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="Ví dụ: Module 1"
                        inputProps={{ maxLength: 70 }}
                        fullWidth
                        value={newName}
                        onChange={handleNewName}
                        disabled={creating}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleIsCreate} disabled={creating}>
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        disabled={creating || !newName}
                    >
                        Lưu
                </Button>
                </DialogActions>
            </form>

        </Dialog>
    </Container>;
}
