export const actionTypes = {
    GET_UPDATEDATA: 'GET_UPDATEDATA',
    GET_UPDATEDATA_SUCCESS: 'GET_UPDATEDATA_SUCCESS',
};

export function getUpdateData(payload) {
    return { type: actionTypes.GET_UPDATEDATA, payload };
}

export function getUpdateDataSuccess(payload) {
    return {
        type: actionTypes.GET_UPDATEDATA_SUCCESS,
        payload,
    };
}