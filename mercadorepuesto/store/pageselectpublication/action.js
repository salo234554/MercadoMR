export const actionTypes = {
    GET_PAGESELECTPUBLICATION: 'GET_PAGESELECTPUBLICATION',
    GET_PAGESELECTPUBLICATION_SUCCESS: 'GET_PAGESELECTPUBLICATION_SUCCESS',
};

export function getPageSelectPublication(payload) {
    return { type: actionTypes.GET_PAGESELECTPUBLICATION, payload };
}

export function getPageSelectPublicationSuccess(payload) {
    return {
        type: actionTypes.GET_PAGESELECTPUBLICATION_SUCCESS,
        payload,
    };
}