import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getPageSelectPublicationSuccess
} from '~/store/pageselectpublication/action';

polyfill();

function* getPageSelectPublicationSaga({ payload }) {
    try {
        yield put(getPageSelectPublicationSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_PAGESELECTPUBLICATION, getPageSelectPublicationSaga)]);
}