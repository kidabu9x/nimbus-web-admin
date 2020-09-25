import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCourse } from "../../../store/cms/course/actions";
import {
    Box,
    Button,
    CircularProgress,
    Typography,
    Container
} from "@material-ui/core";


export default function QuizList() {
    const { course, getting, org } = useSelector(({ cms }) => ({
        course: cms.course.course,
        getting: cms.course.getting,
        org: cms.org.org
    }));

    const { courseId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCourse(courseId));
    }, [courseId, dispatch]);

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
        <Link>
            <Button>Back</Button>
        </Link>
    </Container>;
}
