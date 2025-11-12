export const actionTypes = {
    GET_CTLRLONGCADENA: 'GET_CTLRLONGCADENA',
    GET_CTLRLONGCADENA_SUCCESS: 'GET_CTLRLONGCADENA_SUCCESS',
};

export function getCtlrLongCadena(payload) {
    return { type: actionTypes.GET_CTLRLONGCADENA, payload };
}

export function getCtlrLongCadenaSuccess(payload) {
    return {
        type: actionTypes.GET_CTLRLONGCADENA_SUCCESS,
        payload,
    };
}