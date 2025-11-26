export const actionTypes = {
    GET_IRALOGINUSER: 'GET_IRALOGINUSER',
    GET_IRALOGINUSER_SUCCESS: 'GET_IRALOGINUSER_SUCCESS',
};

export function getIraLoginUser(payload) {
    return { type: actionTypes.GET_IRALOGINUSER, payload };
}

export function getIraLoginUserSuccess(payload) {
    return {
        type: actionTypes.GET_IRALOGINUSER_SUCCESS,
        payload,
    };
}