import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getViewVehPrdSuccess
} from '~/store/viewvehprd/action';

polyfill();

function* getViewVehPrdSaga({ payload }) {
    try {
        yield put(getViewVehPrdSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_VIEWVEHPRD, getViewVehPrdSaga)]);
}