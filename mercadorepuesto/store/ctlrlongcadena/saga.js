import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCtlrLongCadenaSuccess
} from '~/store/ctlrlongcadena/action';

polyfill();

function* getCtlrLongCadenaSaga({ payload }) {
    try {
        yield put(getCtlrLongCadenaSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes. GET_CTLRLONGCADENA, getCtlrLongCadenaSaga)]);
}
