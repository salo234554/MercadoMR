import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getValFltrCiudadSuccess
} from '~/store/validarfiltrociudad/action';

polyfill();

function* getValFltrCiudadSaga({ payload }) {
    try {
        yield put(getValFltrCiudadSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VALFLTRCIUDAD, getValFltrCiudadSaga)]);
}