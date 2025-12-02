export const actionTypes = {
    GET_CTLRVEHSELECTED: 'GET_CTLRVEHSELECTED',
    GET_CTLRVEHSELECTED_SUCCESS: 'GET_CTLRVEHSELECTED_SUCCESS',
};

export function getCtlrVehSelected(payload) {
    return { type: actionTypes.GET_CTLRVEHSELECTED, payload };
}

export function getCtlrVehSelectedSuccess(payload) {
    return {
        type: actionTypes.GET_CTLRVEHSELECTED_SUCCESS,
        payload,
    };
}