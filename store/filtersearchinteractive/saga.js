import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getFilterSearchInteractiveSuccess,
} from '~/store/filtersearchinteractive/action';

polyfill();

function* getFilterSearchInteractiveSaga({ payload }) {
    try {
        yield put( getFilterSearchInteractiveSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_FILTERSEARCHINTERACTIVE, getFilterSearchInteractiveSaga)]);
}