import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCtlrVehSelectedSuccess
} from '~/store/ctlrvehselected/action';

polyfill();

function* getCtlrVehSelectedSaga({ payload }) {
    try {
        yield put(getCtlrVehSelectedSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CTLRVEHSELECTED, getCtlrVehSelectedSaga)]);
}
