import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    filterCourses
} from "../../../store/cms/course/actions";
import {
    Typography,
    Divider,
    Container
} from "@material-ui/core";

const CourseList = () => {
    const { org, courses, total, requesting } = useSelector(({ cms }) => ({
        org: cms.org.org,
        courses: cms.course.courses,
        total: cms.course.total,
        requesting: cms.course.requesting
    }));

    const [page] = useState(0);
    const [size] = useState(30);
    const [name] = useState(null);

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

    }, [page, size, name, org, dispatch]);

    return (
        <Container>
            <Typography variant="h5" gutterBottom>
                Danh sách khóa học
            </Typography>
            <Divider />
        </Container>
    )
}

export default CourseList;