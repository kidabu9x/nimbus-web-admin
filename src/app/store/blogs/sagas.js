import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import {
    getAllBlogs,
    deleteBlog
} from "../../api/blog.api";
import {
    GET_BLOGS_REQUESTING,
    GET_BLOGS_ERROR,
    GET_BLOGS_SUCCESS,
    DELETE_BLOG_REQUESTING,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_ERROR
} from "./constants";


function* getBlogsFlow(action) {
    try {
        const { categoryId, page, limit, searchTerm } = action.payload;
        const response = yield call(getAllBlogs, page, limit, searchTerm, categoryId);
        const blogs = response.data.data;
        const meta = response.data.meta;
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

function* deleteBlogFlow(action) {
    try {
        const { id } = action.payload;
        yield call(deleteBlog, id);
        yield put({
            type: DELETE_BLOG_SUCCESS
        });
    } catch (error) {
        yield put({
            type: DELETE_BLOG_ERROR
        });
    }
}

function* watcher() {
    yield takeEvery(GET_BLOGS_REQUESTING, getBlogsFlow);
    yield takeLatest(DELETE_BLOG_REQUESTING, deleteBlogFlow);
}

export default watcher;