import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCloseOpenVehSearchSuccess
} from '~/store/closeopenvehsearch/action';

polyfill();

function* getCloseOpenVehSearchSaga({ payload }) {
    try {
        yield put(getCloseOpenVehSearchSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CLOSEOPENVEHSEARCH, getCloseOpenVehSearchSaga)]);
}