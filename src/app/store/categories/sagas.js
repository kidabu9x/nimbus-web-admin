import { takeEvery, put, call, takeLatest } from "redux-saga/effects";
import {
    getAllCategories,
    deleteCategory,
    createCategory,
    updateCategory
} from "../../api/category.api";
import {
    GET_CATEGORIES_REQUESTING,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_ERROR,
    DELETE_CATEGORY_REQUESTING,
    // DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR,
    CREATE_CATEGORY_REQUESTING,
    // CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    UPDATE_CATEGORY_REQUESTING,
    // UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_ERROR
} from "./constants";

function getErrorMessage(error) {
    const response = error.response;
    return response && response.data && response.data.meta && response.data.meta.message ? response.data.meta.message : error.message;;
}

function* getCategoriesFlow() {
    try {
        const response = yield call(getAllCategories);
        const categories = response.data.data;
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: {
                categories
            }
        });
    } catch (error) {
        yield put({
            type: GET_CATEGORIES_ERROR,
            payload: {
                message: getErrorMessage(error)
            }
        });
    }
}

function* deleteCategoryFlow(action) {
    try {
        const { id } = action.payload;
        yield call(deleteCategory, id);
        const response = yield call(getAllCategories);
        const categories = response.data.data;
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: {
                categories
            }
        });
    } catch (error) {
        yield put({
            type: DELETE_CATEGORY_ERROR,
            payload: {
                message: getErrorMessage(error)
            }
        });
    }
}

function* createCategoryFlow(action) {
    try {
        const data = action.payload;
        yield call(createCategory, data);
        const response = yield call(getAllCategories);
        const categories = response.data.data;
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: {
                categories
            }
        });
    } catch (error) {
        yield put({
            type: CREATE_CATEGORY_ERROR,
            payload: {
                message: getErrorMessage(error)
            }
        });
    }
}

function* updateCategoryFlow(action) {
    try {
        const { id, category } = action.payload;
        yield call(updateCategory, id, category);
        const response = yield call(getAllCategories);
        const categories = response.data.data;
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: {
                categories
            }
        });
    } catch (error) {
        yield put({
            type: UPDATE_CATEGORY_ERROR,
            payload: {
                message: getErrorMessage(error)
            }
        });
    }
}

function* watcher() {
    yield takeEvery(GET_CATEGORIES_REQUESTING, getCategoriesFlow);
    yield takeLatest(DELETE_CATEGORY_REQUESTING, deleteCategoryFlow);
    yield takeLatest(CREATE_CATEGORY_REQUESTING, createCategoryFlow);
    yield takeLatest(UPDATE_CATEGORY_REQUESTING, updateCategoryFlow);
}

export default watcher;