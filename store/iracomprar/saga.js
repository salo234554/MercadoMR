import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getIraComprarSuccess
} from '~/store/iracomprar/action';

polyfill();

function* getIraComprarSaga({ payload }) {
    try {
        yield put( getIraComprarSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_IRACOMPRAR, getIraComprarSaga)]);
}