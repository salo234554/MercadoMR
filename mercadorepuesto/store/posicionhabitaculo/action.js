export const actionTypes = {
    GET_POSICIONHABITACULO: 'GET_POSICIONHABITACULO',
    GET_POSICIONHABITACULO_SUCCESS: 'GET_POSICIONHABITACULO_SUCCESS',
};

export function getPosicionHabitaculo(payload) {
    return { type: actionTypes.GET_POSICIONHABITACULO, payload };
}

export function getPosicionHabitaculoSuccess(payload) {
    return {
        type: actionTypes.GET_POSICIONHABITACULO_SUCCESS,
        payload,
    };
}