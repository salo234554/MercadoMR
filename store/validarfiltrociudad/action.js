export const actionTypes = {
    GET_VALFLTRCIUDAD: 'GET_VALFLTRCIUDAD',
    GET_VALFLTRCIUDAD_SUCCESS: 'GET_VALFLTRCIUDAD_SUCCESS',
};

export function getValFltrCiudad(payload) {
    return { type: actionTypes.GET_VALFLTRCIUDAD, payload };
}

export function getValFltrCiudadSuccess(payload) {
    return {
        type: actionTypes.GET_VALFLTRCIUDAD_SUCCESS,
        payload,
    };
}