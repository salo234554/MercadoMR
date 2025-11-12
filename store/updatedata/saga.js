import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getUpdateDataSuccess
} from '~/store/updatedata/action';

polyfill();

function* getUpdateDataSaga({ payload }) {
    try {
        yield put( getUpdateDataSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_UPDATEDATA, getUpdateDataSaga)]);
}