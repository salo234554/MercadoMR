export const actionTypes = {
    GET_IRACOMPRAR: 'GET_IRACOMPRAR',
    GET_IRACOMPRAR_SUCCESS: 'GET_IRACOMPRAR_SUCCESS',
};

export function getIraComprar(payload) {
    return { type: actionTypes.GET_IRACOMPRAR, payload };
}

export function getIraComprarSuccess(payload) {
    return {
        type: actionTypes.GET_IRACOMPRAR_SUCCESS,
        payload,
    };
}