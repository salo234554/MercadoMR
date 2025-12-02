import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getOptionSelectSuccess
} from '~/store/optionselect/action';

polyfill();

function* getOptionSelectSaga({ payload }) {
    try {
        yield put(getOptionSelectSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_OPTIONSELECT, getOptionSelectSaga)]);
}