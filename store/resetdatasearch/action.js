export const actionTypes = {
    GET_RESETDATASEARCH: 'GET_RESETDATASEARCH',
    GET_RESETDATASEARCH_SUCCESS: 'GET_RESETDATASEARCH_SUCCESS',
};

export function getResetDataSearch(payload) {
    return { type: actionTypes.GET_RESETDATASEARCH, payload };
}

export function getResetDataSearchSuccess(payload) {
    return {
        type: actionTypes.GET_RESETDATASEARCH_SUCCESS,
        payload,
    };
}