import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getDeleteItemFindSuccess,
} from '~/store/deleteitemfind/action';

polyfill();

function* getDeleteItemFindSaga({ payload }) {
    try {
        yield put(getDeleteItemFindSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_DELETEITEMFIND, getDeleteItemFindSaga)]);
}
