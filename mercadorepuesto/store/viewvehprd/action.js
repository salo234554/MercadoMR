export const actionTypes = {
    GET_VIEWVEHPRD: 'GET_VIEWVEHPRD',
    GET_VIEWVEHPRD_SUCCESS: 'GET_VIEWVEHPRD_SUCCESS',
};

export function getViewVehPrd(payload) {
    return { type: actionTypes.GET_VIEWVEHPRD, payload };
}

export function getViewVehPrdSuccess(payload) {
    return {
        type: actionTypes.GET_VIEWVEHPRD_SUCCESS,
        payload,
    };
}