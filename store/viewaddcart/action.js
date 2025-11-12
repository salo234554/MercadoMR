export const actionTypes = {
    GET_VIEWADDCART: 'GET_VIEWADDCART',
    GET_VIEWADDCART_SUCCESS: 'GET_VIEWADDCART_SUCCESS',
};

export function getViewAddCart(payload) {
    return { type: actionTypes.GET_VIEWADDCART, payload };
}

export function getViewAddCartSuccess(payload) {
    return {
        type: actionTypes.GET_VIEWADDCART_SUCCESS,
        payload,
    };
}