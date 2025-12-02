import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getViewAddCartSuccess
} from '~/store/viewaddcart/action';

polyfill();

function* getViewAddCartSaga({ payload }) {
    try {
        yield put(getViewAddCartSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VIEWADDCART, getViewAddCartSaga)]);
}