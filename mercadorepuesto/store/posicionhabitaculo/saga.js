import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getPosicionHabitaculoSuccess
} from '~/store/posicionhabitaculo/action';

polyfill();

function* getPosicionHabitaculoSaga({ payload }) {
    try {
        yield put(getPosicionHabitaculoSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_POSICIONHABITACULO, getPosicionHabitaculoSaga)]);
}