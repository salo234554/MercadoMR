import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getZoomDataSearchSuccess
} from '~/store/zoomdatasearch/action';

polyfill();

function* getZoomDataSearchSaga({ payload }) {
    try {
        yield put(getZoomDataSearchSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ZOOMDATASEARCH, getZoomDataSearchSaga)]);
}