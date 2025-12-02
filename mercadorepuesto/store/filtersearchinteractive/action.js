export const actionTypes = {
    GET_FILTERSEARCHINTERACTIVE: 'GET_FILTERSEARCHINTERACTIVE',
    GET_FILTERSEARCHINTERACTIVE_SUCCESS: 'GET_FILTERSEARCHINTERACTIVE_SUCCESS',
};

export function getFilterSearchInteractive(payload) {
    return { type: actionTypes.GET_FILTERSEARCHINTERACTIVE, payload };
}

export function getFilterSearchInteractiveSuccess(payload) {
    return {
        type: actionTypes.GET_FILTERSEARCHINTERACTIVE_SUCCESS,
        payload,
    };
}