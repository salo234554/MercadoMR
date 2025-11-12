import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getResetDataSearchSuccess
} from '~/store/resetdatasearch/action';

polyfill();

function* getResetDataSearchSaga({ payload }) {
    try {
        yield put(getResetDataSearchSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_RESETDATASEARCH, getResetDataSearchSaga)]);
}
