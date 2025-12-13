import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getMaxVehAddCartSuccess
} from '~/store/maxvehaddcart/action';

polyfill();

function* getMaxVehAddCartSaga({ payload }) {
    try {
        yield put(getMaxVehAddCartSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_MAXVEHADDCART, getMaxVehAddCartSaga)]);
}
