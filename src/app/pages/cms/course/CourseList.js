import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filterCourses,
    createCourse
} from "../../../store/cms/course/actions";
import {
    Typography,
    Divider,
    Container,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    LinearProgress,
    CircularProgress
} from "@material-ui/core";

const CourseList = () => {
    const { org, filtering, creating, createSuccess } = useSelector(({ cms }) => ({
        org: cms.org.org,
        courses: cms.course.courses,
        total: cms.course.total,
        filtering: cms.course.filtering,

        creating: cms.course.creating,
        createSuccess: cms.course.createSuccess,
    }));

    const [page] = useState(0);
    const [size] = useState(30);
    const [name] = useState(null);

    const [isCreate, setIsCreate] = useState(false);
    const [newName, setNewName] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (org != null) {
            dispatch(filterCourses({
                page,
                size,
                name,
                orgIds: [org.id]
            }));
        }

    }, [page, size, name, org, createSuccess, dispatch]);

    const toggleIsCreate = () => {
        setIsCreate(!isCreate);
    }

    const handleNewName = (event) => {
        setNewName(event.target.value);
    }

    useEffect(() => {
        if (createSuccess > 0) {
            setNewName('');
            toggleIsCreate();
        }
    }, [createSuccess]);

    const onCreate = () => {
        dispatch(createCourse({
            name: newName,
            orgId: org.id
        }));
    }

    return (
        <>
            <Container>
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Typography variant="h5" gutterBottom>
                        Danh sách khóa học
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
            <Dialog open={isCreate} onClose={toggleIsCreate} disableBackdropClick={creating} aria-labelledby="create-new-course">
                {creating ? <LinearProgress /> : null}
                <DialogTitle id="create-new-course">Tạo khóa học</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tạo khóa học mới đơn giản bằng cách nhập tên khóa học mà bạn muốn
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="Ví dụ: MOS 2016"
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
                        onClick={onCreate}
                        color="primary"
                        disabled={creating || !newName}
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CourseList;