import { takeEvery, put, call } from "redux-saga/effects";
import {
    getAllBlogs
} from "../../api/blog.api";
import {
    GET_BLOGS_REQUESTING,
    GET_BLOGS_ERROR,
    GET_BLOGS_SUCCESS
} from "./constants";


function* getBlogsFlow(action) {
    try {
        const { data } = action.payload;
        const response = yield call(getAllBlogs, data);
        console.log(response);
        const blogs = response.data.data;
        console.log(blogs);
        const meta = response.data.meta;
        console.log(meta);
        yield put({
            type: GET_BLOGS_SUCCESS,
            payload: {
                blogs,
                total: meta.total
            }
        });
    } catch (error) {
        yield put({
            type: GET_BLOGS_ERROR
        });
    }
}


function* watcher() {
    yield takeEvery(GET_BLOGS_REQUESTING, getBlogsFlow);
}

export default watcher;