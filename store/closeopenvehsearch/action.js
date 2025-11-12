export const actionTypes = {
    GET_CLOSEOPENVEHSEARCH: 'GET_CLOSEOPENVEHSEARCH',
    GET_CLOSEOPENVEHSEARCH_SUCCESS: 'GET_CLOSEOPENVEHSEARCH_SUCCESS',
};

export function getCloseOpenVehSearch(payload) {
    return { type: actionTypes.GET_CLOSEOPENVEHSEARCH, payload };
}

export function getCloseOpenVehSearchSuccess(payload) {
    return {
        type: actionTypes.GET_CLOSEOPENVEHSEARCH_SUCCESS,
        payload,
    };
}