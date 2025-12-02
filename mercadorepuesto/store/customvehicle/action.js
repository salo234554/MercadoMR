export const actionTypes = {
    GET_CUSTOMVEHICLE: 'GET_CUSTOMVEHICLE',
    GET_CUSTOMVEHICLE_SUCCESS: 'GET_CUSTOMVEHICLE_SUCCESS',
};

export function getCustomVehicle(payload) {
    return { type: actionTypes.GET_CUSTOMVEHICLE, payload };
}

export function getCustomVehicleSuccess(payload) {
    return {
        type: actionTypes.GET_CUSTOMVEHICLE_SUCCESS,
        payload,
    };
}