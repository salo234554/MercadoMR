import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getEditEngineSuccess,
} from '~/store/editengine/action';

polyfill();

function* getEditEngineSaga({ payload }) {
    try {
        yield put(getEditEngineSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_EDITENGINE, getEditEngineSaga)]);
}
