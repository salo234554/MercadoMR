export const actionTypes = {
    GET_CHANGEPARTVEH: 'GET_CHANGEPARTVEH',
    GET_CHANGEPARTVEH_SUCCESS: 'GET_CHANGEPARTVEH_SUCCESS',
};

export function getChangePartVeh(payload) {
    return { type: actionTypes.GET_CHANGEPARTVEH, payload };
}

export function getChangePartVehSuccess(payload) {
    return {
        type: actionTypes.GET_CHANGEPARTVEH_SUCCESS,
        payload,
    };
}