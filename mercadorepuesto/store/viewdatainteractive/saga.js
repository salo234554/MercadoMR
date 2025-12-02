import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getViewDataInteractiveSuccess
} from '~/store/viewdatainteractive/action';

polyfill();

function* getViewDataInteractiveSaga({ payload }) {
    try {
        yield put(getViewDataInteractiveSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VIEWDATAINTERACTIVE, getViewDataInteractiveSaga)]);
}