export const actionTypes = {
    GET_VIEWDATAINTERACTIVE: 'GET_VIEWDATAINTERACTIVE',
    GET_VIEWDATAINTERACTIVE_SUCCESS: 'GET_VIEWDATAINTERACTIVE_SUCCESS',
};

export function getViewDataInteractive(payload) {
    return { type: actionTypes.GET_VIEWDATAINTERACTIVE, payload };
}

export function getViewDataInteractiveSuccess(payload) {
    return {
        type: actionTypes.GET_VIEWDATAINTERACTIVE_SUCCESS,
        payload,
    };
}