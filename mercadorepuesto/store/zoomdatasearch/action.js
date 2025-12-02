export const actionTypes = {
    GET_ZOOMDATASEARCH: 'GET_ZOOMDATASEARCH',
    GET_ZOOMDATASEARCH_SUCCESS: 'GET_ZOOMDATASEARCH_SUCCESS',
};

export function getZoomDataSearch(payload) {
    return { type: actionTypes.GET_ZOOMDATASEARCH, payload };
}

export function getZoomDataSearchSuccess(payload) {
    return {
        type: actionTypes.GET_ZOOMDATASEARCH_SUCCESS,
        payload,
    };
}