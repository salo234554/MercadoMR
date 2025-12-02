export const actionTypes = {
    GET_ACTIVARVIEWPRD: 'GET_ACTIVARVIEWPRD',
    GET_ACTIVARVIEWPRD_SUCCESS: 'GET_ACTIVARVIEWPRD_SUCCESS',
};

export function getActivarViewPrd(payload) {
    return { type: actionTypes.GET_ACTIVARVIEWPRD, payload };
}

export function getActivarViewPrdSuccess(payload) {
    return {
        type: actionTypes.GET_ACTIVARVIEWPRD_SUCCESS,
        payload,
    };
}