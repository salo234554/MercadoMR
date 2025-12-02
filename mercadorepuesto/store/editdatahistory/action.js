export const actionTypes = {
    GET_EDITDATAHISTORY: 'GET_EDITDATAHISTORY',
    GET_EDITDATAHISTORY_SUCCESS: 'GET_EDITDATAHISTORY_SUCCESS',
};

export function getEditDataHistory(payload) {
    return { type: actionTypes.GET_EDITDATAHISTORY, payload };
}

export function getEditDataHistorySuccess(payload) {
    return {
        type: actionTypes.GET_EDITDATAHISTORY_SUCCESS,
        payload,
    };
}