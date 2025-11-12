import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getEditDataHistorySuccess
} from '~/store/editdatahistory/action';

polyfill();

function* getEditDataHistorySaga({ payload }) {
    try {
        yield put(getEditDataHistorySuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_EDITDATAHISTORY, getEditDataHistorySaga)]);
}
