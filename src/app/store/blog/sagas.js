import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import {
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
} from "../../api/blog.api";
import {
    GET_BLOG_REQUESTING,
    GET_BLOG_ERROR,
    GET_BLOG_SUCCESS,
    DELETE_BLOG_REQUESTING,
    DELETE_BLOG_SUCCESS,
    DELETE_BLOG_ERROR,
    CREATE_BLOG_REQUESTING,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_ERROR,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_ERROR,
    UPDATE_BLOG_REQUESTING
} from "./constants";

function getErrorMessage(error) {
    const response = error.response;
    return response && response.data && response.data.meta && response.data.meta.message ? response.data.meta.message : error.message;;
}

function* getBlogFlow(action) {
    try {
        const { id } = action.payload;
        const response = yield call(getBlog, id);
        const blog = response.data.data;
        yield put({
            type: GET_BLOG_SUCCESS,
            payload: {
                blog
            }
        });
    } catch (error) {
        const message = getErrorMessage(error);
        yield put({
            type: GET_BLOG_ERROR,
            payload: {
                message
            }
        });
    }
}

function* createBlogFlow(action) {
    try {
        const data = action.payload;
        const response = yield call(createBlog, data);
        const blog = response.data.data;
        yield put({
            type: CREATE_BLOG_SUCCESS,
            payload: {
                blog
            }
        });
    } catch (error) {
        const message = getErrorMessage(error);
        yield put({
            type: CREATE_BLOG_ERROR,
            payload: {
                message
            }
        });
    }
}

function* updateBlogFlow(action) {
    try {
        const { id, blog } = action.payload;
        yield call(updateBlog, id, blog);
        yield put({
            type: UPDATE_BLOG_SUCCESS
        });
    } catch (error) {
        const message = getErrorMessage(error);
        yield put({
            type: UPDATE_BLOG_ERROR,
            payload: {
                message
            }
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
        const message = getErrorMessage(error);
        yield put({
            type: DELETE_BLOG_ERROR,
            payload: {
                message
            }
        });
    }
}

function* watcher() {
    yield takeEvery(GET_BLOG_REQUESTING, getBlogFlow);
    yield takeLatest(DELETE_BLOG_REQUESTING, deleteBlogFlow);
    yield takeLatest(CREATE_BLOG_REQUESTING, createBlogFlow);
    yield takeLatest(UPDATE_BLOG_REQUESTING, updateBlogFlow);
}

export default watcher;