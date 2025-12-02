import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getChangePartVehSuccess
} from '~/store/changepartveh/action';

polyfill();

function* getChangePartVehSaga({ payload }) {
    try {
        yield put(getChangePartVehSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CHANGEPARTVEH, getChangePartVehSaga)]);
}
