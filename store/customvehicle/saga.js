import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import {
    actionTypes,
    getCustomVehicleSuccess
} from '~/store/customvehicle/action';

polyfill();

function* getCustomVehicleSaga({ payload }) {
    try {
        yield put(getCustomVehicleSuccess(payload));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CUSTOMVEHICLE, getCustomVehicleSaga)]);
}