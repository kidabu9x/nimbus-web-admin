import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourse } from "../../../../store/cms/course/actions";
import {
    filterCodes,
    createCode,
    updateCode,
    deleteCode
} from "../../../../api/cms/code.api";
import {
    Box,
    CircularProgress,
    Container,
    Typography
} from "@material-ui/core";


export default function List() {
    const { course, getting, org } = useSelector(({ cms }) => ({
        course: cms.course.course,
        getting: cms.course.getting,
        org: cms.org.org
    }));
    let { courseId } = useParams();
    courseId = parseInt(courseId);
    const dispatch = useDispatch();

    const [filtering, setFiltering] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [statuses, setStatuses] = useState(["ACTIVE", "INACTIVE"]);
    const [codes, setCodes] = useState([]);

    useEffect(() => {
        dispatch(getCourse(courseId));
    }, [courseId, dispatch]);

    useEffect(() => {
        setFiltering(true);
        filterCodes({
            page: page,
            size: size,
            courseId: courseId,
            q: search,
            statuses: statuses
        }).then(response => {
            const data = response.data.data;
            const meta = response.data.meta;
            setCodes(data);
            setTotal(meta.total);
            setFiltering(false);
        }).catch(error => {
            console.log(error);
            setFiltering(false);
        });
    }, [courseId, page, size, search, statuses]);


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
        <h3>Hello World</h3>
    </Container>
}