export const actionTypes = {
    GET_DELETEITEMFIND: 'GET_DELETEITEMFIND',
    GET_DELETEITEMFIND_SUCCESS: 'GET_DELETEITEMFIND_SUCCESS',
};

export function getDeleteItemFind(payload) {
    //console.log("GET TYPES IDENTIFICATIONS : ", payload)
    return { type: actionTypes.GET_DELETEITEMFIND, payload };
}

export function getDeleteItemFindSuccess(payload) {
    return {
        type: actionTypes.GET_DELETEITEMFIND_SUCCESS,
        payload,
    };
}