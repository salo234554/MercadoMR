export const actionTypes = {
    GET_MAXVEHADDCART: 'GET_MAXVEHADDCART',
    GET_MAXVEHADDCART_SUCCESS: 'GET_MAXVEHADDCART_SUCCESS',
};

export function getMaxVehAddCart(payload) {
    return { type: actionTypes.GET_MAXVEHADDCART, payload };
}

export function getMaxVehAddCartSuccess(payload) {
    return {
        type: actionTypes.GET_MAXVEHADDCART_SUCCESS,
        payload,
    };
}