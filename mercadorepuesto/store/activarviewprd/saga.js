import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getActivarViewPrdSuccess
} from '~/store/activarviewprd/action';

polyfill();

function* getActivarViewPrdSaga({ payload }) {
    try {
        yield put(getActivarViewPrdSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ACTIVARVIEWPRD, getActivarViewPrdSaga)]);
}